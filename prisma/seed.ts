import { prisma } from "../lib/prisma";

async function main() {
  const clients = [
    {
      id: "wedding-invitation",
      displayName: "Amara & Nayana",
      adminPasscode: "AMARA2026",
      googleSheetId: process.env.GOOGLE_SHEET_ID_WEDDING_INVITATION || undefined,
    },
    {
      id: "kasun-devmini",
      displayName: "Kasun & Devmini",
      adminPasscode: "KASUN2026",
      googleSheetId: process.env.GOOGLE_SHEET_ID_KASUN_DEVMINI || undefined,
    },
    {
      id: "royal-heritage",
      displayName: "Umidu & Thimeth",
      adminPasscode: "ROYAL2026",
      googleSheetId: process.env.GOOGLE_SHEET_ID_ROYAL_HERITAGE || undefined,
    },
  ];

  for (const client of clients) {
    // Only overwrite googleSheetId when an env var is provided — never wipe an existing sheet link
    const updateData: {
      displayName: string;
      adminPasscode: string;
      googleSheetId?: string;
    } = {
      displayName: client.displayName,
      adminPasscode: client.adminPasscode,
    };

    if (client.googleSheetId) {
      updateData.googleSheetId = client.googleSheetId;
    }

    await (prisma as any).client.upsert({
      where: { id: client.id },
      update: updateData,
      create: {
        id: client.id,
        displayName: client.displayName,
        adminPasscode: client.adminPasscode,
        googleSheetId: client.googleSheetId ?? null,
      },
    });
  }

  console.log(`Seeded ${clients.length} clients.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
