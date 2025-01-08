import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }
    await mongoose.connect(mongoURI, {
      dbName: "library",
    });

    return mongoose.connection.db;
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
