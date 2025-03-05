import { model, Schema } from "mongoose";
import { todoSchema } from "./todoSchema.mjs";

const userSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: String,
  adress: String,
  todos: { type: [todoSchema], required: true },
});

const User = model("user", userSchema);
export default User;
