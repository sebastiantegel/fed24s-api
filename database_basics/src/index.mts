import express from "express";
import { logger } from "./middleware/logger.mjs";
import dotenv from "dotenv";
import morgan from "morgan";
import todoRoutes from "./routes/todoRoutes.mjs";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(logger);
app.use(morgan("tiny"));

app.use("/todos", todoRoutes);

app.get("/ping", (_, res) => {
  res.status(200).json({ status: "Alive" });
});

app.listen(port, async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sebastiantegel:UsMeHBSPvUpUoSs2@cluster0.a2ub8.mongodb.net/Todos?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`Server running on port: ${port}, connected to database`);
  } catch (error) {
    console.error(error);
  }
});
