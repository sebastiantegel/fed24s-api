import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

const rooms: string[] = ["React", "Express", "Socket.io"];

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
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });

  socket.on("sendChatMessage", (theMessage: string, room: string) => {
    // Lägga till objekt i lista
    // { from: '....', to: '....', datetime: Date.now(), message: theMessage }

    io.to(room).emit("receivedChatMessage", theMessage);
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.emit("roomList", rooms);
});

// Lyssna på node-servern istället för express
server.listen(3000, () => {});
