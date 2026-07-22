"use client";

import { useState, useTransition } from "react";
import { deleteRsvp } from "@/app/actions/wedding-invitation/rsvp";
import { Search, Trash2, Filter } from "lucide-react";

type GuestMessage = {
  id: string;
  name: string;
  attending: string;
  guestCount: number;
  message: string | null;
  submittedAt: Date;
};

function formatDate(date: Date): string {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RsvpTable({ rsvps }: { rsvps: GuestMessage[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "accept" | "decline">("all");
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this RSVP?")) {
      startTransition(async () => {
        await deleteRsvp(id);
      });
    }
  };

  // Filter and search logic
  const filteredRsvps = rsvps.filter((rsvp) => {
    const matchesSearch = rsvp.name.toLowerCase().includes(search.toLowerCase()) || 
                          (rsvp.message && rsvp.message.toLowerCase().includes(search.toLowerCase()));
    
    const matchesFilter = filter === "all" || rsvp.attending === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <section>
      <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">
          All Guest Responses ({filteredRsvps.length})
        </h2>

        {/* Search and Filter Controls */}
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9a8a]" />
            <input
              type="text"
              placeholder="Search guests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-[#E8DCC8] bg-white py-2 pl-10 pr-4 text-sm text-[#2f2f2f] outline-none transition-colors focus:border-[#C5A059] sm:w-64"
            />
          </div>
          
          <div className="flex overflow-hidden rounded-full border border-[#E8DCC8] bg-white text-sm">
            {(["all", "accept", "decline"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 capitalize transition-colors ${
                  filter === f
                    ? "bg-[#C5A059] font-semibold text-white"
                    : "text-[#5a5a5a] hover:bg-[#FAF7F2]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {rsvps.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E8DCC8] bg-white py-20 text-center">
          <p className="text-2xl italic text-[#b0a898]">
            No RSVPs yet. They will appear here once guests start responding.
          </p>
        </div>
      ) : filteredRsvps.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E8DCC8] bg-white py-20 text-center">
          <p className="text-2xl italic text-[#b0a898]">
            No RSVPs match your search.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#E8DCC8] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E8DCC8] bg-[#FAF7F2]">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">#</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">Guest Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">Guests</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">Message</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">Submitted At</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-widest text-[#9a9a8a]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRsvps.map((rsvp, index) => (
                  <tr
                    key={rsvp.id}
                    className={`border-b border-[#F0EBE0] transition-colors last:border-0 hover:bg-[#FFF9F1] ${isPending ? 'opacity-50' : ''}`}
                  >
                    <td className="px-6 py-4 text-[#b0a898]">{filteredRsvps.length - index}</td>
                    <td className="px-6 py-4 font-semibold text-[#2f2f2f]">{rsvp.name}</td>
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
                    <td className="px-6 py-4 text-center text-[#5a5a5a]">
                      {rsvp.attending === "accept" ? rsvp.guestCount : "—"}
                    </td>
                    <td className="max-w-xs px-6 py-4 text-[#5a5a5a]">
                      {rsvp.message ? (
                        <span className="italic">&ldquo;{rsvp.message}&rdquo;</span>
                      ) : (
                        <span className="text-[#c0b8a8]">No message</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-xs text-[#9a9a8a]">
                      {formatDate(rsvp.submittedAt)}
                    </td>
                    <td className="px-6 py-4 text-right text-xs">
                      <button
                        onClick={() => handleDelete(rsvp.id)}
                        disabled={isPending}
                        className="inline-flex items-center justify-center rounded-full p-2 text-red-400 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50 transition-colors"
                        title="Delete RSVP"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
