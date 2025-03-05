import { Types } from "mongoose";
import { UserDto } from "../models/userDto.mjs";
import User from "../models/userSchema.mjs";
import { TodoDto } from "../models/TodoDto.mjs";

const convertUserDbToUserDto = (userFromDb: {
  todos: Types.DocumentArray<
    {
      id: number;
      text: string;
      done: boolean;
    },
    Types.Subdocument<
      Types.ObjectId,
      any,
      {
        id: number;
        text: string;
        done: boolean;
      }
    > & {
      id: number;
      text: string;
      done: boolean;
    }
  >;
  id: number;
  name: string;
  email?: string | undefined | null;
  adress?: string | undefined | null;
}) => {
  return {
    id: userFromDb.id,
    name: userFromDb.name,
    todos: userFromDb.todos.map(
      (t) => ({ id: t.id, text: t.text, done: t.done } satisfies TodoDto),
    ),
  } satisfies UserDto;
};

export const createUser = async (
  name: string,
  email?: string,
  adress?: string,
): Promise<UserDto> => {
  const newUser = await User.create({
    id: Date.now(),
    name: name,
    email: email,
    adress: adress,
    todos: [],
  });

  const dto = convertUserDbToUserDto(newUser);

  return dto;
};

export const getUsers = async (): Promise<UserDto[]> => {
  const users = await User.find();

  const dtos = users.map((u) => convertUserDbToUserDto(u));

  return dtos;
};

export const addTodoToUser = async (
  id: number,
  todo: string,
): Promise<UserDto> => {
  const foundUser = await User.findOne({ id: id });

  if (!foundUser) throw Error("User not found with id " + id);

  foundUser.todos.push({ id: Date.now(), text: todo, done: false });
  const savedUser = await foundUser.save();

  return convertUserDbToUserDto(savedUser);
};
