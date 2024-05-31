import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/helper/db";

connectDB();

export async function POST(request) {
    
    try {
        const { email, password } = await request.json();

        const user = await User.findOne({ email });

        // 1. Check email
        if (!user) {
            return NextResponse.json({
                message: "User not found!",
                success: false,
            }, {
                status: 404,
            });
        }

        // 2. Check password
        const matched = bcrypt.compareSync(password, user.password);
        if (!matched) {
            return NextResponse.json({
                message: "Password not matched",
                success: false,
            }, {
                status: 401,
            });
        }

        // 3. Generate token
        const token = jwt.sign({
            _id: user._id,
            name: user.name
        }, process.env.JWT_KEY, { expiresIn: '1h' }); // token valid for 1 hour

        console.log(token);


        // 4. creaye nextresponse-- cookie

        const response=NextResponse.json({
            message:"Login success !!",
            success:true,
        });
        
        // ******************************************
        response.cookies.set("authToken",token,{
            expiresIn:"1d",
            httpOnly:true,
        });
        // ******************************************

        return response;

        // Exclude the password from the returned user object
        // const { password: _, ...userWithoutPassword } = user._doc;

        // return NextResponse.json({
        //     user: userWithoutPassword,
        //     token: token,
        //     success: true,
        // });



    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Failed to login",
            success: false,
        }, {
            status: 500,
        });
    }
}





