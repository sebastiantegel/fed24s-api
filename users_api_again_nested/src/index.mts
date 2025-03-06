import express, { json } from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRouter.mjs";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGO_URL;

if (!dbUrl) throw Error("No MONGO_URL in env file");

const app = express();

app.use(json());

app.get("/ping", (_, res) => {
  res.status(200).json({ status: "I'm aliiiiive" });
});

// Om url slutar med /users ta oss till userRouter
app.use("/users", userRouter);

app.listen(port, async () => {
  await mongoose.connect(dbUrl);
  console.log("Api is up and running, connected to database");
});
