import mongoose from "mongoose";

async function dbConnect() {
    try {
        let connectRes = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${connectRes.connection.name} , ${connectRes.connection.host}`);
    } catch (error) {
        console.error('Database Connection Failed', error);
        process.exit(1);
    }
}

export default dbConnect;