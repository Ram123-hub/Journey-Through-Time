import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths
  const isPublicPath = ["/", "/login", "/signup"].includes(path);

  // Get the token from the request
  const token = await getToken({ req: request });

  // If the user is authenticated and tries to access a public path, redirect them to the homepage
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If the user is not authenticated and tries to access a protected path, redirect them to the login page
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/viewTimeline",
    "/timelineForm",
    "/figures",
    "/figureForm",
    "/eraExploration",
    "/eraExplorationForm",
    "/inventions",
    "/inventionForm",
    "/maps",
  ],
};
