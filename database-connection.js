import mongoose from "mongoose";

async function dbConnect() {
    try {
        const DB_URL = process.env.DB_URL;
        await mongoose.connect(DB_URL)
        console.log('Database connected!')
        return mongoose.connection
    } catch (error) {
        console.log('Error while connecting to DB', error)
    }
}

export default dbConnect;