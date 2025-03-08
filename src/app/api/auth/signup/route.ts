import { hashPassword } from "@/libs/auth.bycrpt";
import { prisma } from "@/libs/prisma.config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password, role, jobTitle } = await request.json();

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Cek jika username sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
        jobTitle,
      },
    });

    console.log(user, "<--- User created successfully");

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message, "<--- Error in signup route");
      return NextResponse.json({ error: "An error occurred during signup", details: error.message }, { status: 500 });
    } else {
      console.error(error, "<--- Unknown error in signup route");
      return NextResponse.json({ error: "An unknown error occurred during signup" }, { status: 500 });
    }
  }
}
