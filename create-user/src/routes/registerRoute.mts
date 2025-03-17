import express from "express";
import { StringSchemaDefinition } from "mongoose";
import { createUser } from "../controllers/registerController.mjs";

export const registerRouter = express.Router();

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

registerRouter.post("/", async (req, res) => {
  try {
    const { name, email, password }: RegisterRequest = req.body;

    if (!name || !email || !password) {
      res.status(400).send("Missing stuff in body");
    } else {
      const newUser = await createUser({ name, email, password });
      res.status(200).json(newUser);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
