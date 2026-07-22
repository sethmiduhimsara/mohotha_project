// lib/prisma.ts
//
// This file creates ONE shared Prisma database client for the whole application.
//
// Prisma v7 with SQLite (via libsql adapter) — PrismaLibSql is a factory
// that receives the connection config directly (not a pre-created client).
//
// WHY THE GLOBAL PATTERN: In Next.js development mode, the server restarts
// frequently (hot reload). Without this pattern, a new database connection
// would be created on every restart, which can cause "too many connections"
// errors. This pattern reuses the existing connection if one already exists.

import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "node:path";

// Extend the global object type to hold our prisma instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Point to the SQLite database file inside the /prisma folder.
  // PrismaLibSql acts as a factory — pass the connection config directly.
  const adapter = new PrismaLibSql({
    url: `file:${path.join(process.cwd(), "prisma", "wedding_invitation.db")}`,
  });
  return new PrismaClient({ adapter, log: ["error"] });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// In development, save the client to the global object so it persists
// across hot module reloads. In production, always create a fresh client.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
