import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { config } from "./config";
import { authRoutes } from "./routes/auth.routes";

async function buildServer() {
  const fastify = Fastify({
    logger: {
      level: config.nodeEnv === "production" ? "info" : "debug",
      transport:
        config.nodeEnv !== "production"
          ? { target: "pino-pretty", options: { colorize: true } }
          : undefined,
    },
    trustProxy: true,
  });

  // ── Plugins ───────────────────────────────────────────────
  await fastify.register(cors, {
    origin: config.frontendUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  await fastify.register(cookie);

  await fastify.register(rateLimit, {
    global: false, // We apply rate-limit per route
  });

  // ── Swagger ───────────────────────────────────────────────
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "UCKIN Auth Microservice",
        description: "Service d'authentification pour l'Université Chrétienne de Kinshasa",
        version: "1.0.0",
      },
      servers: [
        { url: `http://localhost:${config.port}`, description: "Development" },
      ],
      tags: [
        { name: "Auth", description: "Endpoints d'authentification" },
        { name: "Health", description: "Santé du service" },
      ],
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: true,
    },
  });

  // ── Health check ──────────────────────────────────────────
  fastify.get("/health", {
    schema: {
      description: "Vérification de santé du service",
      tags: ["Health"],
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "string" },
            service: { type: "string" },
            timestamp: { type: "string" },
          },
        },
      },
    },
  }, async () => {
    return {
      status: "ok",
      service: "uckin-auth",
      timestamp: new Date().toISOString(),
    };
  });

  // ── Auth Routes ───────────────────────────────────────────
  await fastify.register(authRoutes);

  return fastify;
}

// ── Start Server ────────────────────────────────────────────
async function start() {
  try {
    const fastify = await buildServer();
    await fastify.listen({ port: config.port, host: config.host });
    fastify.log.info(`🚀 Auth service running on http://localhost:${config.port}`);
    fastify.log.info(`📚 Swagger docs: http://localhost:${config.port}/docs`);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
