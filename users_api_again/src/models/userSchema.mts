import { model, Schema } from "mongoose";

const userSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: String,
});

const User = model("user", userSchema);
export default User;
