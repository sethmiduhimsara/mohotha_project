// prisma.config.ts
//
// Prisma v7 database configuration file.
// The SQLite database file lives at: prisma/wedding_invitation.db

import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: `file:${path.join(process.cwd(), "prisma", "wedding_invitation.db")}`,
  },
});
