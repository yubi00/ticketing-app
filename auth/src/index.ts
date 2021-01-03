import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  console.log("Starting auth service up......");
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("connected to auth  db");
  } catch (err) {
    console.log(err.message);
  }
  app.listen(3000, () => {
    console.log("auth service starting on port 3000");
  });
};

start();
