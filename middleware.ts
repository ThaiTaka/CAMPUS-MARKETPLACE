import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

const ALLOWED_EMAIL_DOMAIN = ".edu.vn";
const BLOCKED_PATH = "/auth/blocked";
const LOGIN_PATH = "/auth/login";
const PROTECTED_PATHS = ["/sell"];

export async function middleware(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const email = session?.user?.email ?? "";
  const isAllowedDomain = email.toLowerCase().endsWith(ALLOWED_EMAIL_DOMAIN);

  if (email && !isAllowedDomain && !req.nextUrl.pathname.startsWith(BLOCKED_PATH)) {
    const blockedUrl = req.nextUrl.clone();
    blockedUrl.pathname = BLOCKED_PATH;
    blockedUrl.searchParams.set("reason", "domain");
    return NextResponse.redirect(blockedUrl);
  }

  const isProtected = PROTECTED_PATHS.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!email && isProtected && !req.nextUrl.pathname.startsWith(LOGIN_PATH)) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = LOGIN_PATH;
    loginUrl.searchParams.set(
      "next",
      `${req.nextUrl.pathname}${req.nextUrl.search}`
    );
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
