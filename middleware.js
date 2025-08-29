import { NextResponse } from 'next/server';

export const config = {
  // protect everything; Next internals and static files are auto-allowed by default
  matcher: ['/:path*'],
};

export default function middleware(req) {
  const user = (process.env.BASIC_USER || 'ArsenalTeam').trim();
  const pass = (process.env.BASIC_PASS || 'nolanhasnoknees').trim();

  const auth = req.headers.get('authorization') || '';

  if (auth.startsWith('Basic ')) {
    try {
      // atob is available in the Edge runtime
      const decoded = atob(auth.slice(6));
      const i = decoded.indexOf(':');
      const u = decoded.slice(0, i);
      const p = decoded.slice(i + 1);
      if (u === user && p === pass) {
        // ✅ let the request continue normally
        return NextResponse.next();
      }
    } catch {
      // fall through to 401
    }
  }

  // ❌ not authorized: ask the browser for creds
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Protected"' },
  });
}
