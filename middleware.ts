import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_URLS = ["/internal"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const tokenExists = Boolean(token);

  const isProtected = PROTECTED_URLS.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !tokenExists) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  if (!isProtected && tokenExists) {
    const url = request.nextUrl.clone();
    url.pathname = "/internal";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
