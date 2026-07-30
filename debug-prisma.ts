import { prisma } from "./lib/prisma";
console.log("Prisma object keys:", Object.keys(prisma));
console.log("Prisma client exists?", !!(prisma as any).client);
