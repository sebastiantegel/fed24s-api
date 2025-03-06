import { Request, Response } from "express";
import User from "../models/userSchema.mjs";
import { InferSchemaType } from "mongoose";
import { UserDto } from "../models/userDto.mjs";

type UserType = InferSchemaType<typeof User.schema>;

const convertDbUserToDto = (dbUser: UserType): UserDto => {
  return { id: dbUser.id, username: dbUser.name } satisfies UserDto;
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name) {
      res.status(400).send("Missing name in body");
    } else {
      const newUser = await User.create({
        id: Date.now(),
        name,
        email,
      });

      const convertedUser = convertDbUserToDto(newUser);

      res.status(201).json(convertedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find();

    // users -> UserDto[]
    // const dtos = users.map((u) => convertDbUserToDto(u));

    const dtos: UserDto[] = [];
    for (let i = 0; i < users.length; i++) {
      const convertedUser = convertDbUserToDto(users[i]);
      dtos.push(convertedUser);
    }

    res.status(200).json(dtos);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
