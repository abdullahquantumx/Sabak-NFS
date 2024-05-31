import { NextResponse } from 'next/server';

export function middleware(request) {
  // console.log('middleware executed !!');

  const authtoken = request.cookies.get('authToken')?.value;

  // If the user is logged in and tries to access the login page, redirect them to the home page
  if (authtoken && request.nextUrl.pathname === '/login' ) {
    console.log('User is already logged in, redirecting to home...');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If no authToken is found and the user is trying to access protected routes, redirect to the login page
  if (!authtoken && !['/login', '/signUp', '/api/login','/api/users'].includes(request.nextUrl.pathname)) {
    console.log('No authToken found, redirecting to login...');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/about',
    '/api/:path*',
    '/login',
    '/signup',
  ],
};
