"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getClient } from "@/lib/clients";

export async function loginAsClient(
  clientId: string,
  passwordAttempt: string
): Promise<{ success: boolean; error?: string }> {
  const client = await getClient(clientId);

  if (!client) {
    return { success: false, error: "Client not found." };
  }

  if (passwordAttempt === client.adminPasscode) {
    (await cookies()).set(`auth_${clientId}`, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    try {
      revalidatePath(`/admin/${clientId}`);
    } catch {
      // revalidatePath requires a Next.js request context
    }
    return { success: true };
  }

  return { success: false, error: "Incorrect passcode. Please try again." };
}
