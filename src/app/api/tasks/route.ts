import { verifyToken } from "@/libs/auth.bycrpt";
import { prisma } from "@/libs/prisma.config";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Ambil token dari header Authorization
    const token = request.headers.get("authorization")?.split(" ")[1];

    // Cek jika token tidak ada
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);

    // Cek jika token tidak valid (decoded null)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
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
        logs: true,
      },
    });

    return NextResponse.json({ message: "Tasks fetched successfully", tasks }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message, "<--- Error in fetching tasks");
      return NextResponse.json({ error: "An error occurred while fetching tasks", details: error.message }, { status: 500 });
    } else {
      console.error(error, "<--- Unknown error in fetching tasks");
      return NextResponse.json({ error: "An unknown error occurred while fetching tasks" }, { status: 500 });
    }
  }
}

export async function POST(request: Request) {
  const { title, description, assignedToId } = await request.json();
  const token = request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);

  // Cek jika token tidak valid (decoded null)
  if (!decoded) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  if (decoded.role !== "lead") {
    return NextResponse.json({ error: "Only Lead can create tasks" }, { status: 403 });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: decoded.userId,
        assignedToId,
      },
    });

    return NextResponse.json({ message: "Task created successfully", task }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message, "<--- Error in creating task");
      return NextResponse.json({ error: "An error occurred while creating task", details: error.message }, { status: 500 });
    } else {
      console.error(error, "<--- Unknown error in creating task");
      return NextResponse.json({ error: "An unknown error occurred while creating task" }, { status: 500 });
    }
  }
}
