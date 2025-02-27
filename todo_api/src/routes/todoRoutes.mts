import express from "express";
import { 
  getTodos,
  getTodosById,
  createTodo,
  updateTodo,
  deleteTodo
 } from "../controllers/todoControllers.mjs";

const router = express.Router()

router.get('/', getTodos)
router.get('/:id', getTodosById)
router.post('/', createTodo)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export default router
