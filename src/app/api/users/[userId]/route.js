import { connectDB } from "@/helper/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(request,{params}){

    const {userId}=params;
    await connectDB;
    const {name,password}=await request.json();

    try {

        const user=await User.findById(userId);
        
        user.name=name;
        user.password=password;

        const updatedUser=await user.save();

        return NextResponse.json(updatedUser, {
            status: 201,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Failed to update user !!",
            status: false,
        }, {
                status: 500,
        });
    }
}
export async function GET(request,{params}){
    const {userId} =params;
    await connectDB;

    try {
        
        const user=await User.findById(userId);
        return NextResponse.json(user);

    } catch (error) {

        return NextResponse.json(error,{
            message:`Failed to fetch User info ${error}`,
            status:false,
        });
    }
}
export async function DELETE(request,{params}){

    await connectDB;

    const {userId} =params;

    try {
        await User.deleteOne({
            _id:userId,
        });

        return NextResponse.json({
            message:"User deleted Successfully",
            status:false,
        });


    } catch (error) {

        return NextResponse.json(error,{
            message:`Failed to delete User ${error}`,
            status:false,
        });
    }
}