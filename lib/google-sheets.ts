import fs from "node:fs";
import path from "node:path";
import { google } from "googleapis";

export type RsvpSheetRow = {
  name: string;
  attending: "accept" | "decline";
  guestCount: number;
  message: string;
  submittedAt: Date;
};

type ServiceAccountCredentials = {
  client_email: string;
  private_key: string;
};

const SHEETS_SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];

const RSVP_HEADERS = ["Name", "Attending", "Guest Count", "Message", "Submitted At"];

function loadCredentialsFromJsonFile(): ServiceAccountCredentials | null {
  const configuredPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE;

  const candidates = [
    configuredPath,
    "google-service-account.json",
    "mohotha-project-d02614dc3402.json",
  ].filter(Boolean) as string[];

  for (const candidate of candidates) {
    const absolutePath = path.isAbsolute(candidate)
      ? candidate
      : path.join(process.cwd(), candidate);

    if (!fs.existsSync(absolutePath)) continue;

    try {
      const raw = fs.readFileSync(absolutePath, "utf8");
      const parsed = JSON.parse(raw) as ServiceAccountCredentials;
      if (parsed.client_email && parsed.private_key) {
        return parsed;
      }
    } catch (error) {
      console.error("[google-sheets] Failed to read credentials file:", absolutePath, error);
    }
  }

  return null;
}

function resolveCredentials(): ServiceAccountCredentials | null {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (email && privateKey) {
    return { client_email: email, private_key: privateKey };
  }

  return loadCredentialsFromJsonFile();
}

function getGoogleAuth() {
  const credentials = resolveCredentials();
  if (!credentials) {
    return null;
  }

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    },
    scopes: SHEETS_SCOPES,
  });
}

function getSheetsClient() {
  const auth = getGoogleAuth();
  if (!auth) return null;
  return google.sheets({ version: "v4", auth });
}

function getDriveClient() {
  const auth = getGoogleAuth();
  if (!auth) return null;
  return google.drive({ version: "v3", auth });
}

function formatAttending(attending: "accept" | "decline"): string {
  return attending === "accept" ? "Yes" : "No";
}

function formatSubmittedAt(date: Date): string {
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getGoogleSheetUrl(sheetId: string): string {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
}

/** Create a new RSVP spreadsheet with headers. Returns the spreadsheet ID. */
export async function createRsvpSpreadsheet(
  title: string
): Promise<{ success: boolean; sheetId?: string; url?: string; error?: string }> {
  const sheets = getSheetsClient();
  const drive = getDriveClient();

  if (!sheets || !drive) {
    return { success: false, error: "Google Sheets credentials not configured." };
  }

  try {
    const created = await sheets.spreadsheets.create({
      requestBody: {
        properties: { title },
        sheets: [{ properties: { title: "Sheet1" } }],
      },
      fields: "spreadsheetId",
    });

    const sheetId = created.data.spreadsheetId;
    if (!sheetId) {
      return { success: false, error: "Spreadsheet created but no ID returned." };
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: "Sheet1!A1:E1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [RSVP_HEADERS] },
    });

    // Anyone with the link can view — safe shareable URL for the couple
    await drive.permissions.create({
      fileId: sheetId,
      requestBody: {
        type: "anyone",
        role: "reader",
      },
    });

    return {
      success: true,
      sheetId,
      url: getGoogleSheetUrl(sheetId),
    };
  } catch (error) {
    const message =
      error && typeof error === "object" && "message" in error
        ? String((error as { message: unknown }).message)
        : "Failed to create Google Sheet.";

    console.error("[createRsvpSpreadsheet] Google API error:", error);

    if (message.includes("permission") || message.includes("PERMISSION")) {
      return {
        success: false,
        error:
          "Service account cannot create sheets in personal Drive. Create the sheet manually in your Google account, share it with the service account as Editor, then run: npm run link:sheet -- <clientId> <sheetId>",
      };
    }

    return { success: false, error: "Failed to create Google Sheet." };
  }
}

export async function appendRsvpRow(
  sheetId: string,
  row: RsvpSheetRow
): Promise<{ success: boolean; error?: string }> {
  const sheets = getSheetsClient();
  if (!sheets) {
    console.warn("[appendRsvpRow] Google Sheets credentials not configured.");
    return { success: false, error: "Google Sheets credentials not configured." };
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            row.name,
            formatAttending(row.attending),
            row.attending === "accept" ? row.guestCount : 0,
            row.message,
            formatSubmittedAt(row.submittedAt),
          ],
        ],
      },
    });

    return { success: true };
  } catch (error) {
    console.error("[appendRsvpRow] Google Sheets error:", error);
    return { success: false, error: "Failed to append row to Google Sheet." };
  }
}
