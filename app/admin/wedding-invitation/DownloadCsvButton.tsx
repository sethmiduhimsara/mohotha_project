"use client";

import { Download } from "lucide-react";

type GuestMessage = {
  id: string;
  name: string;
  attending: string;
  guestCount: number;
  message: string | null;
  submittedAt: Date;
};

export default function DownloadCsvButton({ data }: { data: GuestMessage[] }) {
  const handleDownload = () => {
    // 1. Create CSV headers
    const headers = ["Guest Name", "Status", "Guests", "Message", "Submitted At"];
    
    // 2. Map data to rows
    const rows = data.map(rsvp => {
      return [
        `"${rsvp.name.replace(/"/g, '""')}"`, // Escape quotes
        rsvp.attending === "accept" ? "Accepted" : "Declined",
        rsvp.attending === "accept" ? rsvp.guestCount : "0",
        `"${(rsvp.message || "No message").replace(/"/g, '""')}"`,
        `"${new Date(rsvp.submittedAt).toLocaleString("en-GB")}"`
      ].join(",");
    });

    // 3. Combine headers and rows
    const csvContent = [headers.join(","), ...rows].join("\n");
    
    // 4. Create Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `wedding_rsvps_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-full border border-[#C5A059] bg-[#C5A059] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#C5A059] shadow-sm"
    >
      <Download className="h-4 w-4" />
      Download CSV
    </button>
  );
}
