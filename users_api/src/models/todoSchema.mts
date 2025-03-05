import { Schema } from "mongoose";

export const todoSchema = new Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  done: { type: Boolean, required: true },
});
