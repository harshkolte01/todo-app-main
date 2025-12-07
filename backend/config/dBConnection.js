const mongoose = require("mongoose");
const dBURL = process.env.MONGODB_URI;

const connectDB = async (next) => {
    try {
        const connection = await mongoose.connect(dBURL, {
            serverSelectionTimeoutMS: 30000,
        });
        console.log(`MongoDB Connected: ${connection.connection.host}`);
        
    } catch (error) {
        next(error);
    }
}

module.exports = connectDB;