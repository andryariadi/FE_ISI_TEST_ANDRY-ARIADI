import { comparePassword, generateToken } from "@/libs/auth.bycrpt";
import { prisma } from "@/libs/prisma.config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();

  try {
    const { username, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: "Username not found. Please check your username or sign up if you don't have an account." }, { status: 401 });
    }

    if (!(await comparePassword(password, user.password))) {
      return NextResponse.json({ error: "Incorrect password. Please try again." }, { status: 401 });
    }

    const token = generateToken(user.id, user.role);

    cookieStore.set({
      name: "accessToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    return NextResponse.json({ message: "Login successful", user }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message, "<---Error in login route");
      return NextResponse.json({ error: "An error occurred during login", details: error.message }, { status: 500 });
    } else {
      console.error(error, "<---Unknown error in login route");
      return NextResponse.json({ error: "An unknown error occurred during login" }, { status: 500 });
    }
  }
}
