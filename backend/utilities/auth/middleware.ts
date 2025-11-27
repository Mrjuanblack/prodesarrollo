import { verifyToken } from "./jwt";
import { NextResponse } from "next/server";
import { CookieKey, getCookie, setCookie } from "./cookie";

export const authMiddleware = async () => {
  const token = await getCookie("token");

  if (!token) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  const decoded = await verifyToken(token);
  const { payload } = decoded;

  if (!decoded || !payload) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  const res = NextResponse.next();
  await setCookie(CookieKey.META_DATA_USER, JSON.stringify(payload));

  return res;
};
