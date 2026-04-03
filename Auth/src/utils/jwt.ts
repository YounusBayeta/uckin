import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { config } from "../config";

export interface TokenPayload {
  sub: string;       // user id
  email: string;
  role: string;
  type: "access" | "refresh";
}

export function signAccessToken(payload: Omit<TokenPayload, "type">): string {
  const options: SignOptions = {
    algorithm: "RS256",
    expiresIn: parseDurationToSeconds(config.jwtAccessExpiresIn),
    issuer: "uckin-auth",
  };
  return jwt.sign({ ...payload, type: "access" }, config.jwtPrivateKey as Secret, options);
}

export function signRefreshToken(payload: Omit<TokenPayload, "type">): string {
  const options: SignOptions = {
    algorithm: "RS256",
    expiresIn: parseDurationToSeconds(config.jwtRefreshExpiresIn),
    issuer: "uckin-auth",
  };
  return jwt.sign({ ...payload, type: "refresh" }, config.jwtPrivateKey as Secret, options);
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, config.jwtPublicKey, {
    algorithms: ["RS256"],
    issuer: "uckin-auth",
  }) as TokenPayload;
}

/** Parse duration string (e.g. "7d", "15m") to seconds */
export function parseDurationToSeconds(duration: string): number {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) throw new Error(`Invalid duration: ${duration}`);
  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case "s": return value;
    case "m": return value * 60;
    case "h": return value * 3600;
    case "d": return value * 86400;
    default: throw new Error(`Unknown unit: ${unit}`);
  }
}
