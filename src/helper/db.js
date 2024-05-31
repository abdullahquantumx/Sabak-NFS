import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "NEXT_TODO",
          });
        //   console.log("Database Connected Succesfully !!");
    } catch (error) {
        console.log(`Connection Failed ${error}`);
    }
    
};

