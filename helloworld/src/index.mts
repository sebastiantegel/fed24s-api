import express from "express";
import { Todo } from "./models/Todo.mjs";

const todos: Todo[] = [
  new Todo("Lära oss express"),
  new Todo("Lära oss Postman"),
  new Todo("Få allt att funka"),
];

todos[0].id = 1;
todos[1].id = 2;
todos[2].id = 3;

// Skapa api (api:t heter app i koden)
const app = express();

app.get("/", (req, res) => {
  const { sortOrder } = req.query;

  if (sortOrder) {
    res.status(200).json(
      todos.sort((t1, t2) => {
        if (sortOrder === "asc") {
          return t1 > t2 ? 1 : t1 === t2 ? 0 : -1;
        }

        return t1 < t2 ? 1 : t1 === t2 ? 0 : -1;
      })
    );
  } else {
    res.status(201).json(todos);
  }
});

// Lyssna efter get-anrop på localhost:3000/hello
app.get("/hello", (_, res) => {
  res.status(200).send("World!");
});

app.get("/:id", (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      res.status(200).json(todos.find((t) => t.id === +id));
    } else {
      res.status(400).send("No id was provided as query parameter");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Sätt igång apit på localhost:3000
app.listen(3000, () => {
  console.log("Api is up and running");
});
