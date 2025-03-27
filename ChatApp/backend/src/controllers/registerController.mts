import User from "../models/userSchema.mjs";
import { InferSchemaType } from "mongoose";
import { UserDto } from "../models/userDto.mjs";
import { RegisterRequest } from "../routes/registerRoute.mjs";
import bcrypt from "bcryptjs";

type UserType = InferSchemaType<typeof User.schema>;

export const convertDbUserToDto = (dbUser: UserType): UserDto => {
  return { username: dbUser.name, email: dbUser.email } satisfies UserDto;
};

export const createUser = async (data: RegisterRequest) => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw Error("User with email " + data.email + " already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data.password, salt);

  //console.log(salt);
  //console.log(hash);

  const newUser = await User.create({
    name: data.name,
    email: data.email,
    password: hash,
  });

  return convertDbUserToDto(newUser);
};
