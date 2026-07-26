import { prisma } from "@/lib/prisma";

export type ClientRecord = {
  id: string;
  displayName: string;
  googleSheetId: string | null;
  adminPasscode: string;
};

export async function getClient(clientId: string): Promise<ClientRecord | null> {
  try {
    return await (prisma as any).client.findUnique({ where: { id: clientId } });
  } catch (error) {
    console.error("[getClient] Database error:", error);
    return null;
  }
}

export { getGoogleSheetUrl } from "@/lib/google-sheets";
