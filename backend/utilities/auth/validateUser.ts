import {
  CookieKey,
  getCookie,
  removeAllCookies,
} from "@/backend/utilities/auth/cookie";
import { User } from "@/domain/user";
import { NextResponse } from "next/server";
import { authMiddleware } from "./middleware";

export async function validateUser(): Promise<User | NextResponse> {
  await authMiddleware();

  const cookie = await getCookie(CookieKey.META_DATA_USER);

  if (!cookie) {
    await removeAllCookies();

    return NextResponse.json(
      { error: "La sesión es inválida o ha expirado" },
      { status: 404 }
    );
  }

  let parsed;

  try {
    parsed = JSON.parse(cookie);
  } catch {
    await removeAllCookies();

    return NextResponse.json(
      {
        error: "Datos de sesión corruptos. Intente iniciar sesión nuevamente.",
      },
      { status: 400 }
    );
  }

  return parsed;
}
