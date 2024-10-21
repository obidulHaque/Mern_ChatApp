import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("DB connection successful");
  } catch (error) {
    console.log("DB connection Fail");
  }
};
export default connectDB;
