import { socket } from "../main";
import { Chat, Message } from "../models/Chat";

export let selectedRoom = "";

export const createChatRoomButtonHtml = (chat: Chat, element: HTMLElement) => {
  const btn = document.createElement("button");
  btn.innerHTML = chat.name;

  btn.addEventListener("click", () => {
    socket.emit("joinRoom", chat.name);
    selectedRoom = chat.name;
  });

  element.appendChild(btn);
};

export const createChatMessagesHtml = (messages: Message[]) => {
  const messagesContainer = document.getElementById("messages");

  if (messagesContainer) {
    messagesContainer.innerHTML = "";
  }

  messages.forEach((message) => {
    createMessageHtml(message);
  });
};

export const createMessageHtml = (message: Message) => {
  const messagesContainer = document.getElementById("messages");

  if (messagesContainer) {
    const messageDiv = document.createElement("div");
    const author = document.createElement("span");
    const time = document.createElement("time");
    const theMessage = document.createElement("p");

    author.innerHTML = message.from;
    time.innerHTML = new Date(message.time).toLocaleString();
    theMessage.innerHTML = message.message;

    messageDiv.appendChild(author);
    messageDiv.appendChild(time);
    messageDiv.appendChild(theMessage);

    if (messagesContainer) {
      messagesContainer.appendChild(messageDiv);
    }
  }
};
