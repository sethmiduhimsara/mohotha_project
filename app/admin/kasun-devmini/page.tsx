// app/admin/kasun-devmini/page.tsx
//
// The Admin Dashboard for the kasun-devmini template.
// Only the client (Kasun & Devmini) accesses this page.
//
// URL: http://localhost:3000/admin/kasun-devmini

import { getAllRsvps } from "@/app/actions/wedding-invitation/rsvp";
import { Cormorant_Garamond } from "next/font/google";
import { cookies } from "next/headers";
import DownloadCsvButton from "@/app/admin/wedding-invitation/DownloadCsvButton";
import RsvpTable from "@/app/admin/wedding-invitation/RsvpTable";
import ClientLoginForm from "@/app/admin/wedding-invitation/ClientLoginForm";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

// ─── Helper: Summary statistics card ──────────────────────────────────────────
function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E8DCC8] bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">
        {label}
      </p>
      <p className={`mt-2 text-4xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

// ─── Main Admin Page ───────────────────────────────────────────────────────────
export default async function KasunAdminPage() {
  const CLIENT_ID = "kasun-devmini";
  const DASHBOARD_PASSWORD = "KASUN2026"; // Hardcoded for this specific client
  
  // ─── Check Authentication ───────────────────────────────────────────────────
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(`auth_${CLIENT_ID}`)?.value === "true";
  
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen bg-[#FAF7F2] ${cormorant.className}`}>
        <ClientLoginForm clientId={CLIENT_ID} correctPassword={DASHBOARD_PASSWORD} />
      </div>
    );
  }

  // Fetch all RSVPs directly from the database for this specific client
  const rsvps = await getAllRsvps(CLIENT_ID);

  // ─── Calculate summary stats ───────────────────────────────────────────────
  const totalAccepted = rsvps.filter((r) => r.attending === "accept").length;
  const totalDeclined = rsvps.filter((r) => r.attending === "decline").length;
  const totalGuests = rsvps
    .filter((r) => r.attending === "accept")
    .reduce((sum, r) => sum + r.guestCount, 0);

  return (
    <div
      className={`min-h-screen bg-[#FAF7F2] ${cormorant.className}`}
      style={{ fontFamily: "sans-serif" }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="border-b border-[#E8DCC8] bg-white px-6 py-5 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059]">
              MOHOTHA · Client Dashboard
            </p>
            <h1
              className={`${cormorant.className} mt-1 text-3xl font-bold text-[#2f2f2f]`}
            >
              Kasun &amp; Devmini · RSVP Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#C5A059]/10 px-3 py-1 text-xs font-semibold text-[#C5A059] hidden sm:inline-block">
              Kasun &amp; Devmini · Nov 10, 2026
            </span>
            <DownloadCsvButton data={rsvps} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* ── Summary Stats ────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">
            Summary
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard
              label="Total Responses"
              value={rsvps.length}
              color="text-[#2f2f2f]"
            />
            <StatCard
              label="Accepted"
              value={totalAccepted}
              color="text-[#6b8c6b]"
            />
            <StatCard
              label="Declined"
              value={totalDeclined}
              color="text-[#a05050]"
            />
            <StatCard
              label="Total Guests"
              value={totalGuests}
              color="text-[#C5A059]"
            />
          </div>
        </section>

        {/* ── Interactive RSVP Table ─────────────────────────────────────── */}
        <RsvpTable rsvps={rsvps} />
      </main>
    </div>
  );
}
