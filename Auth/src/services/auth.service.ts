import bcrypt from "bcryptjs";
import { pool } from "../db/postgres";
import { redis } from "../db/redis";
import { config } from "../config";
import {
  signAccessToken,
  signRefreshToken,
  verifyToken,
  parseDurationToSeconds,
  TokenPayload,
} from "../utils/jwt";
import { RegisterInput, LoginInput } from "../schemas/auth.schema";

export interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: string;
  matricule: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// ── Register ──────────────────────────────────────────────────
export async function registerUser(input: RegisterInput) {
  const { email, password, first_name, last_name, matricule } = input;

  // Check if user exists
  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  if (existing.rows.length > 0) {
    throw { statusCode: 409, message: "Un compte avec cet email existe déjà" };
  }

  // Check matricule uniqueness
  if (matricule) {
    const existingMat = await pool.query("SELECT id FROM users WHERE matricule = $1", [matricule]);
    if (existingMat.rows.length > 0) {
      throw { statusCode: 409, message: "Ce matricule est déjà utilisé" };
    }
  }

  const passwordHash = await bcrypt.hash(password, config.bcryptSaltRounds);

  const result = await pool.query(
    `INSERT INTO users (email, password_hash, first_name, last_name, matricule)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, email, first_name, last_name, role, matricule, created_at`,
    [email, passwordHash, first_name, last_name, matricule || null]
  );

  return result.rows[0];
}

// ── Login ─────────────────────────────────────────────────────
export async function loginUser(input: LoginInput) {
  const { email, password } = input;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  const user: UserRow | undefined = result.rows[0];

  if (!user) {
    throw { statusCode: 401, message: "Email ou mot de passe incorrect" };
  }

  if (!user.is_active) {
    throw { statusCode: 403, message: "Compte désactivé. Contactez l'administration." };
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw { statusCode: 401, message: "Email ou mot de passe incorrect" };
  }

  const tokenPayload = { sub: user.id, email: user.email, role: user.role };
  const accessToken = signAccessToken(tokenPayload);
  const refreshToken = signRefreshToken(tokenPayload);

  // Store refresh token in Redis
  const refreshTTL = parseDurationToSeconds(config.jwtRefreshExpiresIn);
  await redis.set(`refresh:${user.id}:${refreshToken}`, "1", "EX", refreshTTL);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      matricule: user.matricule,
    },
  };
}

// ── Refresh Token ─────────────────────────────────────────────
export async function refreshTokens(oldRefreshToken: string) {
  let payload: TokenPayload;
  try {
    payload = verifyToken(oldRefreshToken);
  } catch {
    throw { statusCode: 401, message: "Refresh token invalide ou expiré" };
  }

  if (payload.type !== "refresh") {
    throw { statusCode: 401, message: "Token type invalide" };
  }

  // Check if refresh token exists in Redis
  const exists = await redis.get(`refresh:${payload.sub}:${oldRefreshToken}`);
  if (!exists) {
    throw { statusCode: 401, message: "Refresh token révoqué" };
  }

  // Revoke old token
  await redis.del(`refresh:${payload.sub}:${oldRefreshToken}`);

  // Fetch fresh user data
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [payload.sub]);
  const user: UserRow | undefined = result.rows[0];

  if (!user || !user.is_active) {
    throw { statusCode: 401, message: "Utilisateur introuvable ou désactivé" };
  }

  const tokenPayload = { sub: user.id, email: user.email, role: user.role };
  const accessToken = signAccessToken(tokenPayload);
  const refreshToken = signRefreshToken(tokenPayload);

  const refreshTTL = parseDurationToSeconds(config.jwtRefreshExpiresIn);
  await redis.set(`refresh:${user.id}:${refreshToken}`, "1", "EX", refreshTTL);

  return { accessToken, refreshToken };
}

// ── Logout ────────────────────────────────────────────────────
export async function logoutUser(refreshToken: string) {
  let payload: TokenPayload;
  try {
    payload = verifyToken(refreshToken);
  } catch {
    // Token already invalid, nothing to revoke
    return;
  }

  await redis.del(`refresh:${payload.sub}:${refreshToken}`);
}

// ── Verify Token ──────────────────────────────────────────────
export function verifyAccessToken(accessToken: string) {
  const payload = verifyToken(accessToken);
  if (payload.type !== "access") {
    throw { statusCode: 401, message: "Token type invalide" };
  }
  return { sub: payload.sub, email: payload.email, role: payload.role };
}

// ── Get User Profile ──────────────────────────────────────────
export async function getUserProfile(userId: string) {
  const result = await pool.query(
    `SELECT id, email, first_name, last_name, role, matricule, is_active, created_at, updated_at
     FROM users WHERE id = $1`,
    [userId]
  );

  if (result.rows.length === 0) {
    throw { statusCode: 404, message: "Utilisateur introuvable" };
  }

  return result.rows[0];
}

// ── Audit Log ─────────────────────────────────────────────────
export async function createAuditLog(data: {
  userId: string | null;
  action: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, unknown>;
}) {
  await pool.query(
    `INSERT INTO audit_logs (user_id, action, ip_address, user_agent, details)
     VALUES ($1, $2, $3, $4, $5)`,
    [data.userId, data.action, data.ipAddress || null, data.userAgent || null, data.details ? JSON.stringify(data.details) : null]
  );
}
