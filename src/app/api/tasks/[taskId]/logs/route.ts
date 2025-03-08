import { prisma } from "@/libs/prisma.config";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ taskId: string }> }) {
  const taskId = (await params).taskId;

  if (!taskId || typeof taskId !== "string") {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  try {
    const logs = await prisma.log.findMany({
      orderBy: { createdAt: "desc" },
      where: { taskId: taskId },
      include: { task: true },
    });

    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error(error, "<---Error in fetching logs for task");
    return NextResponse.json({ error: "An error occurred while fetching logs for task" }, { status: 500 });
  }
}
