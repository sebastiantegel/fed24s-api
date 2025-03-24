import { io } from "socket.io-client";
import "./style.css";

const socket = io("http://localhost:3000");

// socket.on("getChat", () => {
//   console.log("Getting chat...");
// });

socket.on("gotChat", (chat: any) => {
  console.log("Got chat:", chat);
});

socket.emit("getChat", "Handlingslista");
