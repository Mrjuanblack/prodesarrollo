import { NextResponse } from "next/server";
import { User, UserRole } from "@/domain/user";
import { validateUser } from "./validateUser";

/**
 * Validate the cookie user AND assert that their role is in `allowed`.
 * Returns the user when authorised, or a NextResponse (401/403/...) when
 * the request must be rejected. Pattern mirrors `validateUser`.
 */
export async function requireRole(
  allowed: UserRole[]
): Promise<User | NextResponse> {
  const result = await validateUser();
  if (result instanceof NextResponse) return result;

  if (!allowed.includes(result.role)) {
    return NextResponse.json(
      { error: "No tienes permisos para realizar esta acción" },
      { status: 403 }
    );
  }

  return result;
}
