import { io } from "socket.io-client";
import "./style.css";
import {
  createChatMessagesHtml,
  createChatRoomButtonHtml,
  createMessageHtml,
  selectedRoom,
} from "./helpers/htmlHelper";
import { Chat, Message } from "@sebastiantegel/edutypes";

const cookies = document.cookie.split("; ");
const loginCookie = cookies.find((cookie) => cookie.startsWith("login="));

if (!loginCookie) {
  location.href = "/login.html";
}

export const socket = io("http://localhost:3000", {
  withCredentials: true,
});

socket.on("chatList", (chats: Chat[]) => {
  const chatsSection = document.getElementById("chats");

  if (chatsSection) {
    chatsSection.innerHTML = "";

    chats.forEach((chat) => {
      createChatRoomButtonHtml(chat, chatsSection);
    });
  }
});

socket.on("roomMessages", (messages: Message[]) => {
  const chat = document.getElementById("chat");
  chat?.classList.remove("hide");

  createChatMessagesHtml(messages);
});

socket.on("messageReceived", (message: Message) => {
  createMessageHtml(message);
});

document.getElementById("send")?.addEventListener("click", () => {
  const messageToSend = (
    document.getElementById("newMessage") as HTMLInputElement
  ).value;

  // Validering

  socket.emit("sendMessage", messageToSend, selectedRoom);
  (document.getElementById("newMessage") as HTMLInputElement).value = "";
});
