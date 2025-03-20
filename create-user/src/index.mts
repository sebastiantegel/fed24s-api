import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { registerRouter } from "./routes/registerRoute.mjs";
import { loginRouter } from "./routes/loginRoute.mjs";
import { secretRouter } from "./routes/secretRoute.mjs";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/auth.mjs";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGO_URL;

if (!dbUrl) throw Error("No MONGO_URL in env file");

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(json());
app.use(cookieParser());

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use(auth);
app.use("/secret", secretRouter);

app.get("/ping", (_, res) => {
  res.status(200).json({ status: "I'm aliiiiive" });
});

app.listen(port, async () => {
  await mongoose.connect(dbUrl);
  console.log("Api is up and running, connected to database");
});
