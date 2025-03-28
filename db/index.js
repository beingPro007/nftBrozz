import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoDBconnection = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(`Mongo DB connected Succesfully with DB Host : ${mongoDBconnection.connection.host}`);
    } catch (error) {
        console.log("Connection Error", error);
        process.exit(1);
    }
}

export { connectDB };