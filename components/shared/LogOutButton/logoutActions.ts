"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env";

export async function logoutAction() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  try {
    await fetch(`${env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/auth/logout`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
    });
  } catch (error) {
    console.error("Logout failed:", error);
  }

  // ❗ Frontend cookie clear (extra safe)
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("better-auth.session_token");

  // 🔥 redirect after logout
  redirect("/login");
}
