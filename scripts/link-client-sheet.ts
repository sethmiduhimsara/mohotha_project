/**
 * Link an existing Google Sheet to a client.
 *
 * 1. Create a Google Sheet in YOUR Google account
 * 2. Add header row: Name | Attending | Guest Count | Message | Submitted At
 * 3. Share the sheet with: mohotha-rsvp@mohotha-project.iam.gserviceaccount.com (Editor)
 * 4. Copy the Sheet ID from the URL:
 *    https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit
 * 5. Run:
 *    npx tsx scripts/link-client-sheet.ts wedding-invitation YOUR_SHEET_ID
 *    npx tsx scripts/link-client-sheet.ts kasun-devmini YOUR_SHEET_ID
 */
import { prisma } from "../lib/prisma";
import { appendRsvpRow, getGoogleSheetUrl } from "../lib/google-sheets";

async function main() {
  const clientId = process.argv[2];
  const sheetId = process.argv[3];

  if (!clientId || !sheetId) {
    console.error(
      "Usage: npx tsx scripts/link-client-sheet.ts <clientId> <googleSheetId>"
    );
    console.error(
      "Example: npx tsx scripts/link-client-sheet.ts wedding-invitation 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
    );
    process.exit(1);
  }

  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) {
    console.error(`Client "${clientId}" not found. Run: npm run db:seed`);
    process.exit(1);
  }

  console.log(`Testing write access to sheet ${sheetId}...`);
  const probe = await appendRsvpRow(sheetId, {
    name: "MOHOTHA Setup Probe",
    attending: "accept",
    guestCount: 1,
    message: "Setup test — you can delete this row",
    submittedAt: new Date(),
  });

  if (!probe.success) {
    console.error("Could not write to the sheet.");
    console.error("Make sure you:");
    console.error("  1. Enabled Google Sheets API in Google Cloud Console");
    console.error(
      "  2. Shared the sheet with mohotha-rsvp@mohotha-project.iam.gserviceaccount.com as Editor"
    );
    console.error(`  3. Used the correct Sheet ID from the URL`);
    process.exit(1);
  }

  await prisma.client.update({
    where: { id: clientId },
    data: { googleSheetId: sheetId },
  });

  const url = getGoogleSheetUrl(sheetId);
  console.log(`\nLinked ${client.displayName} (${clientId})`);
  console.log(`SHARE THIS LINK WITH THE CLIENT:`);
  console.log(url);
  console.log(`\nGuest RSVPs on the invitation will now appear in this sheet.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
