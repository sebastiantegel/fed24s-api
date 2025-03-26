import { io } from "socket.io-client";
import "./style.css";

const socket = io("http://localhost:3000");

let selectedRoom = "";

socket.on("roomList", (rooms: string[]) => {
  const roomDiv = document.getElementById("rooms");

  if (roomDiv) {
    roomDiv.innerHTML = "";
  }

  rooms.forEach((room) => {
    const btn = document.createElement("button");
    btn.innerHTML = room;
    btn.addEventListener("click", () => {
      socket.emit("joinRoom", room);
      selectedRoom = room;
      roomDiv?.remove();
    });

    if (roomDiv) {
      roomDiv.appendChild(btn);
    }
  });
});

socket.on("receivedChatMessage", (theMessage: string) => {
  const message = document.createElement("p");
  message.innerHTML = theMessage;

  const theChat = document.getElementById("chat");

  if (theChat) {
    theChat.appendChild(message);
  }
});

// socket.on("echo", () => {
//   const theEcho = document.createElement("p");
//   theEcho.innerHTML = "echo, echo, echo ...";

//   document.getElementById("app")!.appendChild(theEcho);
// });

document.getElementById("send")?.addEventListener("click", () => {
  const theMessage = (
    document.getElementById("chatmessage") as HTMLInputElement
  ).value;

  socket.emit("sendChatMessage", theMessage, selectedRoom);
  (document.getElementById("chatmessage") as HTMLInputElement).value = "";
});

// const buttonYell = document.createElement("button");
// buttonYell.innerHTML = "WOHOO";
// buttonYell.addEventListener("click", () => {
//   socket.emit("yelling");
// });

// document.getElementById("app")!.appendChild(buttonYell);
