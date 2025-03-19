import express from "express";

export const secretRouter = express.Router();

secretRouter.get("/", async (req, res) => {
  res.status(200).json({ message: "The most ultimate secret in the api" });
});
