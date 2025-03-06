import { model, Schema } from "mongoose";
import { adressSchema } from "./adressSchema.mjs";

const userSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: String,
  adress: { type: adressSchema, required: true },
});

const User = model("user", userSchema);
export default User;
