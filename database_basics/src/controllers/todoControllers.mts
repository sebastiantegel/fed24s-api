import { Request, Response } from "express";
import { TodoDTO } from "../models/TodoDTO.mjs";
import Todo from "../models/todoSchema.mjs";

// const todos: TodoDTO[] = [
//   new TodoDTO(1, "Learn express"),
//   new TodoDTO(2, "Learn next"),
//   new TodoDTO(3, "Study more"),
//   new TodoDTO(4, "Eat"),
//   new TodoDTO(5, "Sleep"),
//   new TodoDTO(6, "Train"),
// ];

export const getTodos = async (req: Request, res: Response) => {
  const { q } = req.query;

  try {
    const todos = await Todo.find();

    if (q) {
      const filtreredTodos = todos.filter(
        (t) => t.text.indexOf(q.toString()) >= 0
      );

      res.status(200).json(filtreredTodos);
    } else {
      res.status(200).json(todos);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTodosById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    //const foundTodo = todos.find((t) => t.id === +id);
    const foundTodo = await Todo.findOne({ id: +id });

    if (foundTodo) {
      res.status(200).json(foundTodo);
    } else {
      res.status(400).json({ status: "Invalid id" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { text } = req.body;

  try {
    if (!text) {
      res.status(400).json({ error: "Text is required" });
    } else {
      // const newTodo = new TodoDTO(todos.length + 1, text);
      // todos.push(newTodo);
      const newTodo = await Todo.create({
        id: Date.now(),
        text: text,
        done: false,
      });
      res.status(201).json(newTodo);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    if (!text) {
      res.status(400).json({ error: "Text is required" });
    } else {
      // const todo = todos.find((t) => t.id === +id);
      const todo = await Todo.findOne({ id: +id });

      if (!todo) {
        res.status(400).json({ error: "Invalid id" });
      } else {
        todo.text = text;
        await todo.save();
        res.status(200).json(todo);
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // const index = todos.findIndex((t) => t.id === +id);
    // if (index === -1) {
    //   res.status(404).json({ error: "Todo not found" });
    // } else {
    //   const removedTodo = todos.splice(index, 1);
    //   res.status(200).json(removedTodo);
    // }

    await Todo.deleteOne({ id: +id });
    res.status(200).end();
  } catch (error) {
    res.status(500).send(error);
  }
};
