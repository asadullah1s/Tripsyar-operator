const mongoose = require('mongoose');

// const URI = "mongodb://127.0.0.1:27017/agency_data";
// mongoose.connect(URI);

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed");
        process.exit(1);
    }
}

module.exports = connectDB;