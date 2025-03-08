import { prisma } from "@/libs/prisma.config";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log(request, "<---routeLogs");

  try {
    const logs = await prisma.log.findMany({
      include: {
        task: true,
      },
    });

    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error(error, "<---Error in fetching logs");
    return NextResponse.json({ error: "An error occurred while fetching logs" }, { status: 500 });
  }
}
