import { verifyToken } from "@/libs/auth.bycrpt";
import { prisma } from "@/libs/prisma.config";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: Promise<{ taskId: string }> }) {
  const taskId = (await params).taskId;

  const token = request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  if (decoded.role !== "lead") {
    return NextResponse.json({ error: "Only Lead can update tasks" }, { status: 403 });
  }

  if (!taskId || typeof taskId !== "string") {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  const { assignedToId, title, description, status } = await request.json();

  // Validasi minimal satu field yang diupdate
  if (!assignedToId && !title && !description && !status) {
    return NextResponse.json({ error: "At least one field (assignedToId, title, description, status) must be provided" }, { status: 400 });
  }

  // Buat object data yang akan diupdate
  const updateData: {
    assignedToId?: string;
    title?: string;
    description?: string;
    status?: string;
  } = {};

  if (assignedToId && typeof assignedToId === "string") {
    updateData.assignedToId = assignedToId;
  }
  if (title && typeof title === "string") {
    updateData.title = title;
  }
  if (description && typeof description === "string") {
    updateData.description = description;
  }
  if (status && typeof status === "string") {
    updateData.status = status;
  }

  try {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: updateData,
      include: {
        assignedTo: {
          select: {
            id: true,
            username: true,
            role: true,
            jobTitle: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            role: true,
            jobTitle: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Task updated successfully",
        task,
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
