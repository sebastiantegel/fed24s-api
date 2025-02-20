import express from "express";
import { Todo } from "./models/Todo.mjs";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const todos: Todo[] = [
  new Todo(1, "Learn express"),
  new Todo(2, "Learn next"),
  new Todo(3, "Study more"),
  new Todo(4, "Eat"),
  new Todo(5, "Sleep"),
  new Todo(6, "Train"),
];

const app = express();

app.get("/ping", (_, res) => {
  res.status(200).json({ status: "Alive" });
});

app.get("/todos", (req, res) => {
  const { q } = req.query;

  try {
    if (q) {
      const filtreredTodos = todos.filter(
        (t) => t.text.indexOf(q.toString()) >= 0,
      );

      res.status(200).json(filtreredTodos);
    } else {
      res.status(200).json(todos);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;

  try {
    const foundTodo = todos.find((t) => t.id === +id);

    if (foundTodo) {
      res.status(200).json(foundTodo);
    } else {
      res.status(400).json({ status: "Invalid id" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log("Api is up and running");
});
