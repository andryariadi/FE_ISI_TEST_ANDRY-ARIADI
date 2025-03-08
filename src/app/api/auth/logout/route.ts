import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log(request, "<--- requestLogout");

  try {
    const cookieStore = await cookies();

    cookieStore.delete("accessToken");

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message, "<--- Error in logout route");
      return NextResponse.json({ error: "An error occurred during logout", details: error.message }, { status: 500 });
    } else {
      console.error(error, "<--- Unknown error in logout route");
      return NextResponse.json({ error: "An unknown error occurred during logout" }, { status: 500 });
    }
  }
}
