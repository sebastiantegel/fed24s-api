import express from "express";
import { createUser, getUsers } from "../controllers/userController.mjs";

// Url:en slutar nu med /users
export const userRouter = express.Router();

// POST - https://localhost:3000/users/
userRouter.post("/", createUser);

// GET - https://localhost:3000/users/
userRouter.get("/", getUsers);
