import express from "express";
import { Todo } from "./models/Todo.mjs";

const todos: Todo[] = [
  new Todo(1, "Abc"),
  new Todo(2, "Bca"),
  new Todo(3, "Öööööhhh, vad händer?"),
  new Todo(4, "Learn express"),
];

// const todos = new Todo(1, "Test");

// Skapa api
const app = express();

// Skapa endpoints

// Syftet med denna är att fungera som en kontroll om vårt api fungerar
app.get("/", (_, res) => {
  res.status(200).json({ status: "Alive" });
});

app.get("/todos", (req, res) => {
  // Skapa en variabel sort som måste finnas i url:en
  // ?sort=asc&q=c
  const { sort, q } = req.query;

  // sort = "asc"
  // filteredTodos kommer att vara vår orginallista från början
  let filteredTodos = todos;

  try {
    if (q) {
      // Om vi skickar med q kommer vi att ersätta orginallistan
      // med resultatet av vår sökning (filtrering)
      filteredTodos = todos.filter((t) => t.text.indexOf(q.toString()) >= 0);
    }

    if (sort) {
      if (sort === "asc") {
        filteredTodos.sort((a, b) => {
          const todo1 = a.text.toLowerCase();
          const todo2 = b.text.toLowerCase();

          if (todo1 > todo2) return 1;
          if (todo1 < todo2) return -1;
          return 0;
        });
      }
      if (sort === "desc") {
        filteredTodos.sort((a, b) => {
          const todo1 = a.text.toLowerCase();
          const todo2 = b.text.toLowerCase();

          if (todo1 > todo2) return -1;
          if (todo1 < todo2) return 1;
          return 0;
        });
      }
    }

    res.status(200).json(filteredTodos);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const foundTodo = todos.find((t) => t.id === +id);

      if (foundTodo) {
        res.status(200).json(foundTodo);
      } else {
        res.status(400).json({ status: "Invalid id" });
      }
    } else {
      res.status(400).json({ status: "Missing id in url" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Starta api:t
app.listen(3000, (error) => {
  console.log("Api is up and running");

  if (error) {
    console.error(error);
  }
});
