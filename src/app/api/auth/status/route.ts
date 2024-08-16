import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET!;

export async function GET() {
  const token = cookies().get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ isAuthenticated1: false }, { status: 401 });
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    return NextResponse.json({ isAuthenticated: true });
  } catch (error) {
    return NextResponse.json({ isAuthenticated2: false }, { status: 401 });
  }
}
