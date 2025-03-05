import express from "express";
import {
  addTodoToUser,
  createUser,
  getUsers,
} from "../controllers/userController.mjs";

export const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  try {
    const { name, email, adress } = req.body;

    if (!name) {
      res.status(400).send("Missing name in body");
    } else {
      const user = await createUser(name, email, adress);
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.get("/", async (_, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

userRouter.put("/addtodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todo } = req.body;

    if (!id || !todo) {
      res.status(400).send("Missing id or todo in request");
    } else {
      const user = await addTodoToUser(+id, todo);
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
