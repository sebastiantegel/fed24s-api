import { Todo } from "./models/Todo";
import "./style.css";

document
  .getElementById("addTodoForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const theText = (document.getElementById("todoText") as HTMLInputElement)
      .value;

    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify({ text: theText }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    (document.getElementById("todoText") as HTMLInputElement).value = "";

    await createHtml(true);
  });

let todos: Todo[] = [];

const createHtml = async (shouldFetch: boolean) => {
  if (shouldFetch) {
    const response = await fetch("http://localhost:3000/todos");
    todos = await response.json();
  }

  const ul = document.getElementById("todoList");
  if (ul) ul.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");

    if (todo.inEdit) {
      const editInput = document.createElement("input");
      editInput.value = todo.text;

      const saveButton = document.createElement("button");
      saveButton.innerHTML = "Spara";
      saveButton.addEventListener("click", async () => {
        await fetch("http://localhost:3000/todos/" + todo.id, {
          method: "PUT",
          body: JSON.stringify({ text: editInput.value }),
          headers: {
            "content-type": "application/json",
          },
        });

        createHtml(true);
      });

      const cancelButton = document.createElement("button");
      cancelButton.innerHTML = "Avbryt";
      cancelButton.addEventListener("click", () => {
        todo.inEdit = false;
        createHtml(false);
      });

      li.appendChild(editInput);
      li.appendChild(saveButton);
      li.appendChild(cancelButton);
    } else {
      li.innerHTML = todo.text;

      const editButton = document.createElement("button");
      editButton.innerHTML = "Ändra";
      editButton.addEventListener("click", () => {
        todo.inEdit = true;
        createHtml(false);
      });

      li.appendChild(editButton);
    }

    ul?.appendChild(li);
  });
};

createHtml(true);
