import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { config } from "../config";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import {
  registerUser,
  loginUser,
  refreshTokens,
  logoutUser,
  verifyAccessToken,
  getUserProfile,
  createAuditLog,
} from "../services/auth.service";

// ── Cookie helpers ────────────────────────────────────────────
function setTokenCookies(reply: FastifyReply, accessToken: string, refreshToken: string) {
  reply.setCookie("access_token", accessToken, {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: "strict",
    path: "/",
    domain: config.cookieDomain,
    maxAge: 15 * 60, // 15 min
  });

  reply.setCookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: "strict",
    path: "/auth",
    domain: config.cookieDomain,
    maxAge: 7 * 24 * 3600, // 7 days
  });
}

function clearTokenCookies(reply: FastifyReply) {
  reply.clearCookie("access_token", { path: "/", domain: config.cookieDomain });
  reply.clearCookie("refresh_token", { path: "/auth", domain: config.cookieDomain });
}

// ── Extract token from header or cookie ───────────────────────
function extractAccessToken(request: FastifyRequest): string | null {
  const authHeader = request.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return (request.cookies as Record<string, string>)?.access_token || null;
}

function extractRefreshToken(request: FastifyRequest): string | null {
  return (request.cookies as Record<string, string>)?.refresh_token || null;
}

// ── Routes ────────────────────────────────────────────────────
export async function authRoutes(fastify: FastifyInstance) {

  // ── POST /auth/register
  fastify.post("/auth/register", {
    schema: {
      description: "Inscription étudiant",
      tags: ["Auth"],
      body: {
        type: "object",
        required: ["email", "password", "first_name", "last_name"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 8 },
          first_name: { type: "string" },
          last_name: { type: "string" },
          matricule: { type: "string" },
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                first_name: { type: "string" },
                last_name: { type: "string" },
                role: { type: "string" },
                matricule: { type: "string", nullable: true },
              },
            },
          },
        },
      },
    },
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = registerSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    try {
      const user = await registerUser(parsed.data);

      await createAuditLog({
        userId: user.id,
        action: "REGISTER",
        ipAddress: request.ip,
        userAgent: request.headers["user-agent"],
      });

      return reply.status(201).send({ success: true, user });
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ success: false, message: err.message });
    }
  });

  // ── POST /auth/login (rate-limited)
  fastify.post("/auth/login", {
    config: {
      rateLimit: {
        max: config.rateLimitLoginMax,
        timeWindow: config.rateLimitLoginWindowMs,
      },
    },
    schema: {
      description: "Connexion utilisateur",
      tags: ["Auth"],
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                first_name: { type: "string" },
                last_name: { type: "string" },
                role: { type: "string" },
                matricule: { type: "string", nullable: true },
              },
            },
          },
        },
      },
    },
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    try {
      const { accessToken, refreshToken, user } = await loginUser(parsed.data);

      setTokenCookies(reply, accessToken, refreshToken);

      await createAuditLog({
        userId: user.id,
        action: "LOGIN",
        ipAddress: request.ip,
        userAgent: request.headers["user-agent"],
      });

      return reply.send({ success: true, user, accessToken });
    } catch (err: any) {
      const status = err.statusCode || 500;

      await createAuditLog({
        userId: null,
        action: "LOGIN_FAILED",
        ipAddress: request.ip,
        userAgent: request.headers["user-agent"],
        details: { email: parsed.data.email },
      });

      return reply.status(status).send({ success: false, message: err.message });
    }
  });

  // ── POST /auth/refresh
  fastify.post("/auth/refresh", {
    schema: {
      description: "Renouvellement du token",
      tags: ["Auth"],
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            accessToken: { type: "string" },
          },
        },
      },
    },
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const refreshToken = extractRefreshToken(request);
    if (!refreshToken) {
      return reply.status(401).send({ success: false, message: "Refresh token manquant" });
    }

    try {
      const tokens = await refreshTokens(refreshToken);
      setTokenCookies(reply, tokens.accessToken, tokens.refreshToken);
      return reply.send({ success: true, accessToken: tokens.accessToken });
    } catch (err: any) {
      clearTokenCookies(reply);
      const status = err.statusCode || 500;
      return reply.status(status).send({ success: false, message: err.message });
    }
  });

  // ── POST /auth/logout
  fastify.post("/auth/logout", {
    schema: {
      description: "Déconnexion (révocation du refresh token)",
      tags: ["Auth"],
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const refreshToken = extractRefreshToken(request);
    if (refreshToken) {
      await logoutUser(refreshToken);
    }

    // Also try to log the action
    const accessToken = extractAccessToken(request);
    if (accessToken) {
      try {
        const payload = verifyAccessToken(accessToken);
        await createAuditLog({
          userId: payload.sub,
          action: "LOGOUT",
          ipAddress: request.ip,
          userAgent: request.headers["user-agent"],
        });
      } catch {
        // Token may be expired, that's fine
      }
    }

    clearTokenCookies(reply);
    return reply.send({ success: true, message: "Déconnexion réussie" });
  });

  // ── GET /auth/verify
  fastify.get("/auth/verify", {
    schema: {
      description: "Vérification d'un token (utilisé par les autres microservices)",
      tags: ["Auth"],
      headers: {
        type: "object",
        properties: {
          authorization: { type: "string", description: "Bearer <access_token>" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            valid: { type: "boolean" },
            user: {
              type: "object",
              properties: {
                sub: { type: "string" },
                email: { type: "string" },
                role: { type: "string" },
              },
            },
          },
        },
      },
    },
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const token = extractAccessToken(request);
    if (!token) {
      return reply.status(401).send({ valid: false, message: "Token manquant" });
    }

    try {
      const payload = verifyAccessToken(token);
      return reply.send({ valid: true, user: payload });
    } catch {
      return reply.status(401).send({ valid: false, message: "Token invalide ou expiré" });
    }
  });

  // ── GET /auth/me
  fastify.get("/auth/me", {
    schema: {
      description: "Profil de l'utilisateur connecté",
      tags: ["Auth"],
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                first_name: { type: "string" },
                last_name: { type: "string" },
                role: { type: "string" },
                matricule: { type: "string", nullable: true },
                is_active: { type: "boolean" },
                created_at: { type: "string" },
                updated_at: { type: "string" },
              },
            },
          },
        },
      },
    },
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const token = extractAccessToken(request);
    if (!token) {
      return reply.status(401).send({ success: false, message: "Non authentifié" });
    }

    try {
      const payload = verifyAccessToken(token);
      const user = await getUserProfile(payload.sub);
      return reply.send({ success: true, user });
    } catch (err: any) {
      const status = err.statusCode || 401;
      return reply.status(status).send({ success: false, message: err.message || "Non authentifié" });
    }
  });
}
