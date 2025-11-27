import { NextResponse } from "next/server";
import { validateUser } from "@/backend/utilities/auth/validateUser";

export async function POST() {
  try {
    const result = await validateUser();

    if (result instanceof NextResponse) {
      return result;
    }

    const parsed = result;

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
