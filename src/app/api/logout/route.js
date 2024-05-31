import { NextResponse } from "next/server";

export async function POST(request) {
  const response = NextResponse.json({
    message: "Logged out !!",
    success: true,
  });

  response.cookies.set("authToken", "", {
    expiresIn: new Date(0),
    httpOnly: true,
    path: '/', // Ensure the cookie is deleted for the entire site
  });

  return response;
}
