import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGO_URL;

if (!dbUrl) {
  throw Error("No MONGO_URL in the .env file");
}

const app = express();
app.use(json());

app.get("/ping", (_, res) => {
  res.status(200).json({ status: "Alive" });
});

app.listen(port, async (error) => {
  await mongoose.connect(dbUrl);
  console.log("Api is up and running, connected to the database");

  if (error) {
    console.error("ERROR", error);
  }
});
