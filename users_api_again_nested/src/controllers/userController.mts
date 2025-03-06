import { Request, Response } from "express";
import User from "../models/userSchema.mjs";
import { InferSchemaType } from "mongoose";
import { AdressDto, UserDto } from "../models/userDto.mjs";

type UserType = InferSchemaType<typeof User.schema>;

const convertDbUserToDto = (dbUser: UserType): UserDto => {
  return {
    id: dbUser.id,
    username: dbUser.name,
    adress: {
      street: dbUser.adress.street,
      zipCode: dbUser.adress.zip,
      region: dbUser.adress.city,
    } satisfies AdressDto,
  } satisfies UserDto;
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, street, zip, city } = req.body;

    if (!name || !street || !zip || !city) {
      res.status(400).send("Missing stuff in body");
    } else {
      const newUser = await User.create({
        id: Date.now(),
        name,
        email,
        adress: {
          street,
          zip,
          city,
        },
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
