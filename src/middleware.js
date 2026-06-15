import { NextResponse } from "next/server";

const COOKIE_NAME = "sesion_rauli";

// Protege las rutas /dashboard/* exigiendo cookie de sesión válida.
export function middleware(request) {
  const cookie = request.cookies.get(COOKIE_NAME);
  const password = process.env.APP_PASSWORD || "FundoRauli2026";

  if (cookie?.value === password) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
