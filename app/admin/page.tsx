// app/admin/page.tsx
//
// The Admin Dashboard for the wedding-invitation template.
// Only YOU (the developer) access this page.
//
// URL: http://localhost:3000/admin
//
// This is a Next.js Server Component — it fetches data directly from the
// database on the server and renders it. No client-side JavaScript needed.

import { getAllRsvps } from "@/app/actions/rsvp";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

// ─── Helper: Format date to a human-readable string ───────────────────────────
function formatDate(date: Date): string {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

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
export default async function AdminPage() {
  // Fetch all RSVPs directly from the database (server-side)
  const rsvps = await getAllRsvps();

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
              MOHOTHA · Admin
            </p>
            <h1
              className={`${cormorant.className} mt-1 text-3xl font-bold text-[#2f2f2f]`}
            >
              Wedding Invitation · RSVP Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#C5A059]/10 px-3 py-1 text-xs font-semibold text-[#C5A059]">
              Amara &amp; Nayana · Dec 12, 2026
            </span>
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

        {/* ── RSVP Table ───────────────────────────────────────────────── */}
        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">
            All Guest Responses ({rsvps.length})
          </h2>

          {rsvps.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#E8DCC8] bg-white py-20 text-center">
              <p className="text-2xl italic text-[#b0a898]">
                No RSVPs yet. They will appear here once guests start
                responding.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-[#E8DCC8] bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E8DCC8] bg-[#FAF7F2]">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">
                        Guest Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">
                        Guests
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">
                        Message
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">
                        Submitted At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps.map((rsvp, index) => (
                      <tr
                        key={rsvp.id}
                        className="border-b border-[#F0EBE0] transition-colors last:border-0 hover:bg-[#FFF9F1]"
                      >
                        {/* Row number */}
                        <td className="px-6 py-4 text-[#b0a898]">
                          {rsvps.length - index}
                        </td>

                        {/* Guest Name */}
                        <td className="px-6 py-4 font-semibold text-[#2f2f2f]">
                          {rsvp.name}
                        </td>

                        {/* Status badge */}
                        <td className="px-6 py-4">
                          {rsvp.attending === "accept" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              Accepted
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                              Declined
                            </span>
                          )}
                        </td>

                        {/* Guest count */}
                        <td className="px-6 py-4 text-center text-[#5a5a5a]">
                          {rsvp.attending === "accept" ? rsvp.guestCount : "—"}
                        </td>

                        {/* Love note */}
                        <td className="max-w-xs px-6 py-4 text-[#5a5a5a]">
                          {rsvp.message ? (
                            <span className="italic">&ldquo;{rsvp.message}&rdquo;</span>
                          ) : (
                            <span className="text-[#c0b8a8]">No message</span>
                          )}
                        </td>

                        {/* Timestamp */}
                        <td className="whitespace-nowrap px-6 py-4 text-xs text-[#9a9a8a]">
                          {formatDate(rsvp.submittedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
