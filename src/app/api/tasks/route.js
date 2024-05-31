import { connectDB } from "@/helper/db";
import { NextResponse } from "next/server";
import Task from "@/models/task";
import jwt from "jsonwebtoken";

export async function GET(){
await connectDB;
try {
    const tasks=await Task.find();
    return NextResponse.json(tasks);
    
} catch (error) {
    console.error(error);
        return NextResponse.json({
            message: "Failed to fetch task",
            success: false,
        }, {
            status: 500,
        });
}
}


export async function POST(request) {
    try {
        await connectDB();
        const { userId, title, description } = await request.json();

        const authToken = request.cookies.get("authToken")?.value;

        const data=jwt.verify(authToken, process.env.JWT_KEY);

        console.log(data._id);

        const task = new Task({
            userId:data._id,
            title,
            description,
        });

        const createdTask = await task.save();

        return NextResponse.json(createdTask, {
            status: 201,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Failed to add task",
            success: false,
        }, {
            status: 500,
        });
    }
}