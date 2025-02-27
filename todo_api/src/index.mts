import express from "express";
import { logger } from './middleware/logger.mjs'
import dotenv from "dotenv";
import morgan from 'morgan'
import todoRoutes from './routes/todoRoutes.mjs'

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json())
app.use(logger)
app.use(morgan('tiny'))

app.use('/todos', todoRoutes)

app.get("/ping", (_, res) => {
  res.status(200).json({ status: "Alive" });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
