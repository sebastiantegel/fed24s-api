import { Request, Response } from "express";
import { Todo } from "../models/Todo.mjs";

const todos: Todo[] = [
  new Todo(1, "Learn express"),
  new Todo(2, "Learn next"),
  new Todo(3, "Study more"),
  new Todo(4, "Eat"),
  new Todo(5, "Sleep"),
  new Todo(6, "Train"),
];

export const getTodos = (req: Request, res: Response) => {
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
}

export const getTodosById = (req: Request, res: Response) => {
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
}

export const createTodo = (req: Request, res: Response) => {
  const { text } = req.body

  try {
    if (!text) {
      res.status(400).json({ error: "Text is required" })
    } else {
      const newTodo = new Todo(todos.length + 1, text)
      todos.push(newTodo)
      res.status(201).json(newTodo)
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params
  const { text } = req.body

  try {
    if (!text) {
      res.status(400).json({ error: "Text is required" })
    } else {
      const todo = todos.find((t) => t.id === +id)
      
      if (!todo) {
        res.status(400).json({ error: "Invalid id"})
      } else {
        todo.text = text
        res.status(200).json(todo)
      }
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const index = todos.findIndex((t) => t.id === +id)

    if (index === -1) {
      res.status(404).json({ error: "Todo not found" })
    } else {
      const removedTodo = todos.splice(index, 1)
      res.status(200).json(removedTodo)
    }
  } catch (error) {
    res.status(500).send(error)
  }
}