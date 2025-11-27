import { NextResponse } from "next/server";
import { validateUser } from "@/backend/utilities/auth/validateUser";

export async function POST() {
  try {
    const sessionDataOrResponse = await validateUser();

    if (sessionDataOrResponse instanceof NextResponse) {
      return sessionDataOrResponse;
    }

    const parsed = sessionDataOrResponse;

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
