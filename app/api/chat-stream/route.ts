/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/env";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const response = await fetch(
      `${env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/ai/chat-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      let errorMsg = "Failed to connect to AI stream proxy";
      try {
        const errData = await response.json();
        if (errData.message) errorMsg = errData.message;
      } catch (e) {
        console.error("Failed to parse proxy error", e);
      }
      return NextResponse.json(
        { success: false, message: errorMsg },
        { status: response.status }
      );
    }

    // Proxy the stream back to the client
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Chat stream proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
