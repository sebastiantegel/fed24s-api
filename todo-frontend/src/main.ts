import { Todo } from "./models/Todo";
import "./style.css";

const response = await fetch("http://localhost:3000/todos");
const todos: Todo[] = await response.json();

const theUl = document.getElementById("todos");

todos.forEach((t) => {
  const li = document.createElement("li");
  li.innerHTML = t.text;
  if (t.done) {
    li.className = "done";
  }

  theUl?.appendChild(li);
});
