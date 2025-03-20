import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router as authRouter } from "./auth.js";
import { authSession } from "./middlewares/session.mjs";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.set("trust proxy", true);

app.use(authRouter);
app.use(authSession);

app.get("/", (_, res) => {
  const { session } = res.locals;
  res.status(200).json(session);
});

app.listen(port, () => {
  console.log("Api is running");
});
