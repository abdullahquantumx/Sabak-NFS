// -> /api/tasks/${userId}

import { NextResponse } from "next/server";
import Task from "@/models/task";
import { connectDB } from "@/helper/db";

export async function GET(request, { params }) {
  const { taskId } = params;
  await connectDB();

  try {
    const task = await Task.findById(taskId);
    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to fetch task",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request, { params }) {
  const { taskId } = params;
  await connectDB();

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return NextResponse.json(
        {
          message: "Task not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Task deleted successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to delete task",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}