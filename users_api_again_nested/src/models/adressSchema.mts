import { Schema } from "mongoose";

export const adressSchema = new Schema({
  street: { type: String, required: true },
  zip: { type: String, required: true },
  city: { type: String, required: true },
});
