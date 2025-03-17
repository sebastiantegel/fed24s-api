import express, { json } from "express";
import cors from "cors";
import { Todo } from "../models/Todo.mts";

const todos: Todo[] = [];

const app = express();

app.use(json());
app.use(cors());

app.post("/todos", (req, res) => {
  const { text } = req.body;

  const theNewTodo = new Todo(text);

  todos.push(theNewTodo);

  res.status(201).json(theNewTodo);
});

app.get("/todos", (_, res) => {
  res.status(200).json(todos);
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const foundTodo = todos.find((t) => t.id === +id);

  if (foundTodo && text) {
    foundTodo.text = text;
  }

  res.status(200).end();
});

app.listen(3000, () => {
  console.log("Up and running");
});
