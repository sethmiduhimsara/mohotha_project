/**
 * Creates a Google Sheet for each client that does not have one yet,
 * saves the sheet ID in the database, and prints the shareable link.
 *
 * Usage: npx tsx scripts/setup-client-sheets.ts
 */
import { prisma } from "../lib/prisma";
import { createRsvpSpreadsheet } from "../lib/google-sheets";

async function main() {
  const clients = await (prisma as any).client.findMany({
    orderBy: { id: "asc" },
  });

  if (clients.length === 0) {
    console.error("No clients found. Run: npm run db:seed");
    process.exit(1);
  }

  console.log(`Found ${clients.length} client(s).\n`);

  for (const client of clients) {
    if (client.googleSheetId) {
      const url = `https://docs.google.com/spreadsheets/d/${client.googleSheetId}/edit`;
      console.log(`✓ ${client.displayName} (${client.id})`);
      console.log(`  Already linked: ${url}\n`);
      continue;
    }

    console.log(`Creating sheet for ${client.displayName} (${client.id})...`);
    const result = await createRsvpSpreadsheet(`${client.displayName} — RSVPs`);

    if (!result.success || !result.sheetId) {
      console.error(`  FAILED: ${result.error}`);
      continue;
    }

    await (prisma as any).client.update({
      where: { id: client.id },
      data: { googleSheetId: result.sheetId },
    });

    console.log(`  Sheet ID: ${result.sheetId}`);
    console.log(`  SHARE THIS LINK WITH THE CLIENT:`);
    console.log(`  ${result.url}\n`);
  }

  console.log("Done. New RSVPs will append to these sheets automatically.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
