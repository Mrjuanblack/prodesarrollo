import { NextResponse } from "next/server";
import { removeAllCookies } from "@/backend/utilities/auth/cookie";

export async function POST() {
  try {
    await removeAllCookies();

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
