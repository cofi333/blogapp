import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth/auth';

export const middleware = async (request: NextRequest) => {
  const protectedRoutes: string[] = ['/home'];
  const session = await auth();
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some((route: string) =>
    pathname.startsWith(route),
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};
