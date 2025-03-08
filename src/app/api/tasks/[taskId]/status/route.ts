import { verifyToken } from "@/libs/auth.bycrpt";
import { prisma } from "@/libs/prisma.config";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: Promise<{ taskId: string }> }) {
  const taskId = (await params).taskId;

  const { status, changes } = await request.json();
  const token = request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  if (!taskId || typeof taskId !== "string") {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  if (!status || typeof status !== "string") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  if (!changes || typeof changes !== "string") {
    return NextResponse.json({ error: "Invalid changes" }, { status: 400 });
  }

  try {
    // Update task status
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    // Create log
    const log = await prisma.log.create({
      data: {
        taskId: task.id,
        changes,
      },
    });

    return NextResponse.json(
      {
        message: "Task updated successfully",
        task,
        log,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error, "<---Error in updating task");
    if (error instanceof Error && error.message.includes("RecordNotFound")) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "An error occurred while updating the task" }, { status: 500 });
  }
}
