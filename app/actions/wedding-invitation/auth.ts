"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function loginAsClient(
  clientId: string,
  passwordAttempt: string,
  correctPassword: string = "AMARA2026"
): Promise<{ success: boolean; error?: string }> {
  
  if (passwordAttempt === correctPassword) {
    // Set a secure, HTTP-only cookie that expires in 7 days
    (await cookies()).set(`auth_${clientId}`, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    
    // Refresh the admin page so it reads the new cookie
    revalidatePath(`/admin/${clientId}`);
    return { success: true };
  }

  return { success: false, error: "Incorrect passcode. Please try again." };
}
