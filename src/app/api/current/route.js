import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import { connectDB } from "@/helper/db";

export async function GET(request) {
    await connectDB();
  try {
    const authToken = request.cookies.get("authToken")?.value;
    
    // Verify the JWT token
    const data = jwt.verify(authToken, process.env.JWT_KEY);

    // Find the user by ID
    const user = await User.findById(data._id).select('-password'); // Exclude password from the user data

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      }, {
        status: 404,
      });
    }

    // Return the user data
    return NextResponse.json({
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Failed to fetch user",
      success: false,
    }, {
      status: 500,
    });
  }
}
