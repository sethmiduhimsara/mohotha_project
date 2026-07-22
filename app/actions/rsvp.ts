"use server";

// app/actions/rsvp.ts
//
// These are Next.js "Server Actions" — backend functions that run on the SERVER,
// not in the browser. This means the database is never exposed to guests.
//
// Functions exported here:
//   - submitRsvp: Called when a guest clicks "Send RSVP with Love"
//   - getAllRsvps: Called by the Admin Dashboard to fetch all responses

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RsvpSubmission = {
  name: string;
  attending: "accept" | "decline";
  guestCount: number;
  message: string;
};

export type RsvpRecord = {
  id: string;
  name: string;
  attending: string;
  guestCount: number;
  message: string;
  submittedAt: Date;
};

// ─── Submit a new RSVP (called from the wedding invitation page) ───────────────

export async function submitRsvp(
  data: RsvpSubmission
): Promise<{ success: boolean; error?: string }> {
  // Validate the data before saving
  if (!data.name || data.name.trim().length < 2) {
    return { success: false, error: "Please enter your full name." };
  }
  if (!data.attending) {
    return { success: false, error: "Please let us know if you will attend." };
  }

  try {
    await prisma.rsvp.create({
      data: {
        name: data.name.trim(),
        attending: data.attending,
        guestCount: data.attending === "decline" ? 0 : Math.max(1, data.guestCount),
        message: data.message.trim(),
      },
    });

    // Tell Next.js to refresh the admin page data automatically
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("[submitRsvp] Database error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

// ─── Get all RSVPs (called from the Admin Dashboard) ──────────────────────────

export async function getAllRsvps(): Promise<RsvpRecord[]> {
  try {
    const rsvps = await prisma.rsvp.findMany({
      orderBy: { submittedAt: "desc" }, // Latest submissions appear first
    });
    return rsvps;
  } catch (error) {
    console.error("[getAllRsvps] Database error:", error);
    return [];
  }
}
