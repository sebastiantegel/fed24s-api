import express from "express";
import { Todo } from "./models/Todo.mjs";

const todos: Todo[] = [
  new Todo("Lära oss express"),
  new Todo("Lära oss Postman"),
  new Todo("Få allt att funka"),
];

// Skapa api (api:t heter app i koden)
const app = express();

app.get("/", (_, res) => {
  res.status(201).json(todos);
});

// Lyssna efter get-anrop på localhost:3000/hello
app.get("/hello", (_, res) => {
  res.status(200).send("World!");
});

// Sätt igång apit på localhost:3000
app.listen(3000, () => {
  console.log("Api is up and running");
});
