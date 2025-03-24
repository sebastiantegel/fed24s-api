import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

// Skapa node-server
const server = createServer(app);

// Skapa socket-server (io)
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (_, res) => {
  res.status(200).json({ message: "It's working" });
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  //   socket.emit("getChat");
  socket.on("getChat", (chatName: string) => {
    console.log("A user wants to get a chat:", chatName);

    // Hämta data från databas

    socket.emit("gotChat", { name: "Handlingslista", items: [] });
  });
});

// Lyssna på node-servern istället för express
server.listen(3000, () => {});
