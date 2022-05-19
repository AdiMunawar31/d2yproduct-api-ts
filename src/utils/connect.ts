import mongoose from "mongoose";
import config from "config";
import log from "./logger";

const connectDb = async () => {
    const dbUri = config.get<string>('dbUri');
    try {
        const conn = await mongoose.connect(dbUri);
        log.info(`MongoDB is connected ${conn.connection.host}`);
    } catch (error) {
        log.error(error);
        process.exit(1);
    }
}

export default connectDb;