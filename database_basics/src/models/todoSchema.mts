import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
    minLength: 3,
  },
  done: Boolean,
});

const Todo = model("Todo", todoSchema);
export default Todo;
