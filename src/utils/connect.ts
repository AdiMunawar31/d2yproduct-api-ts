import mongoose from "mongoose";
import config from "config";

const connectDb = async () => {
    const dbUri = config.get<string>('dbUri');
    try {
        const conn = await mongoose.connect(dbUri);
        console.log(`🔥MongoDB is connected ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDb;