import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.nextUrl.searchParams.get("accessToken");
    const refreshToken = req.nextUrl.searchParams.get("refreshToken");

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: "Could not authenticate1" },
        { status: 499 },
      );
    }
    cookies().set("accessToken", accessToken, config);
    cookies().set("refreshToken", refreshToken, config);
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Could not authenticate2" },
      { status: 499 },
    );
  }
}
