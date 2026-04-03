import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

function loadKey(envPath: string): string {
  const keyPath = path.resolve(process.env[envPath] || "");
  if (!fs.existsSync(keyPath)) {
    throw new Error(`Key file not found: ${keyPath}. Run "npm run generate-keys" first.`);
  }
  return fs.readFileSync(keyPath, "utf-8");
}

export const config = {
  port: parseInt(process.env.PORT || "4000", 10),
  host: process.env.HOST || "0.0.0.0",
  nodeEnv: process.env.NODE_ENV || "development",

  // Database
  databaseUrl: process.env.DATABASE_URL!,

  // Redis
  redisUrl: process.env.REDIS_URL!,

  // JWT
  jwtPrivateKey: loadKey("JWT_PRIVATE_KEY_PATH"),
  jwtPublicKey: loadKey("JWT_PUBLIC_KEY_PATH"),
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  // Bcrypt
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10),

  // Cookie
  cookieDomain: process.env.COOKIE_DOMAIN || "localhost",
  cookieSecure: process.env.COOKIE_SECURE === "true",

  // Rate limit
  rateLimitLoginMax: parseInt(process.env.RATE_LIMIT_LOGIN_MAX || "5", 10),
  rateLimitLoginWindowMs: parseInt(process.env.RATE_LIMIT_LOGIN_WINDOW_MS || "900000", 10),

  // CORS
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
};
