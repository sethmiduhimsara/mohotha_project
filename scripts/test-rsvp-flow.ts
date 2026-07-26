import { submitRsvp, getAllRsvps } from "../app/actions/wedding-invitation/rsvp";
import { getClient } from "../lib/clients";
import { appendRsvpRow } from "../lib/google-sheets";
import { prisma } from "../lib/prisma";

async function main() {
  const clientId = "wedding-invitation";
  const client = await getClient(clientId);

  if (!client) {
    console.error("Client not found. Run: npm run db:seed");
    process.exit(1);
  }

  console.log("Client loaded:", {
    id: client.id,
    displayName: client.displayName,
    googleSheetId: client.googleSheetId ?? "none (Sheets sync skipped)",
  });

  const result = await submitRsvp({
    name: "Test Guest",
    attending: "accept",
    guestCount: 2,
    message: "Integration test",
    clientId,
  });

  console.log("submitRsvp result:", result);

  const rsvps = await getAllRsvps(clientId);
  const latest = rsvps[0];

  console.log("Total RSVPs:", rsvps.length);
  console.log("Latest RSVP:", latest?.name, latest?.attending, latest?.guestCount);

  if (!result.success) {
    await prisma.rsvp.deleteMany({
      where: { clientId, name: "Test Guest" },
    });
    process.exit(1);
  }

  if (!latest || latest.name !== "Test Guest") {
    console.error("Expected latest RSVP to be Test Guest");
    process.exit(1);
  }

  console.log("DB dual-write path OK (SQLite saved).");

  if (client.googleSheetId) {
    const sheetResult = await appendRsvpRow(client.googleSheetId, {
      name: "Sheets Probe Guest",
      attending: "decline",
      guestCount: 0,
      message: "Direct Sheets API probe",
      submittedAt: new Date(),
    });
    console.log("appendRsvpRow probe:", sheetResult);
    if (!sheetResult.success) {
      console.error(
        "Google Sheets append failed. Share the sheet with the service account as Editor, then retry."
      );
      await prisma.rsvp.deleteMany({
        where: { clientId, name: { in: ["Test Guest", "Sheets Probe Guest"] } },
      });
      process.exit(1);
    }
    console.log("Google Sheets sync OK.");
  } else {
    console.log(
      "Skipped live Sheets append (no googleSheetId). Set GOOGLE_SHEET_ID_WEDDING_INVITATION and re-seed to enable."
    );
  }

  // Remove this run's test guest (and any leftover Test Guest rows from prior runs)
  await prisma.rsvp.deleteMany({
    where: { clientId, name: { in: ["Test Guest", "Sheets Probe Guest"] } },
  });
  console.log("Cleaned up test RSVP rows.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
