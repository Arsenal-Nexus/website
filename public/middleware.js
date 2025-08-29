import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:css|js|png|jpg|jpeg|gif|svg|ico|woff2?)$).*)"],
};

export default function middleware(req) {
  const auth = req.headers.get("authorization") || "";
  const expectedUser = process.env.BASIC_AUTH_USER || "ArsenalTeam";
  const expectedPass = process.env.BASIC_AUTH_PASS || "nolanhasnoknees";

  if (auth.startsWith("Basic ")) {
    const [, b64] = auth.split(" ");
    const [user, pass] = atob(b64).split(":");
    if (user === expectedUser && pass === expectedPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Protected"' },
  });
}
