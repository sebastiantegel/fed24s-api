import { TodoDto } from "./TodoDto.mjs";

export type UserDto = {
  id: number;
  name: string;
  todos: TodoDto[];
};
