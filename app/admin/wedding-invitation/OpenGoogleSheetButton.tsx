"use client";

import { ExternalLink } from "lucide-react";

export default function OpenGoogleSheetButton({ sheetId }: { sheetId: string }) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-[#E8DCC8] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#2f2f2f] transition-colors hover:border-[#C5A059] hover:text-[#C5A059]"
    >
      <ExternalLink className="h-4 w-4" />
      Open Google Sheet
    </a>
  );
}
