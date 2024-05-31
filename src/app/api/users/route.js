import { NextResponse } from "next/server";
import { connectDB } from "@/helper/db";
import User from "@/models/user";
import bcrypt from "bcryptjs"

export async function GET(request) {
    await connectDB();

    try {
        const userInfo = await User.find().select("-password");
        // const userInfo = await User.find().select("-password");   to avoid printing the password

        return NextResponse.json(userInfo, {
            status: 200,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            message: "Failed to fetch user information",
            status: false,
        }, {
            status: 500,
        });
    }
}


export async function POST(request) {
    await connectDB();
    
    try {
        const { name, email, password } = await request.json();
    
        const user = new User({
            name,
            email,
            password,
        });

        user.password=await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT));
    
        const createdUser = await user.save();
    
        return NextResponse.json(createdUser, {
            status: 201,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Failed to create user !!",
            status: false,
        }, {
                status: 500,
        });
    }
   }



// export function DELETE(request){
//     console.log("Deleted !!");
//     return NextResponse.json({
//         message:"Deleted succesfully",
//         status:true,
//     });
// }



// export function PUT(){}