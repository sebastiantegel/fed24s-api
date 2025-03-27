import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { loginRouter } from "./routes/loginRoute.mjs";
import { registerRouter } from "./routes/registerRoute.mjs";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { Chat, Message } from "./models/Chat.mjs";
import cookieParser from "cookie-parser";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { UserDto } from "./models/UserDto.mjs";
import ChatModel from "./models/chatSchema.mjs";

dotenv.config();

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  throw Error("No mongo url in env file");
}

const app = express();
app.use(json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.get("/", (_, res) => {
  res.status(200).json({ message: "I'm alive" });
});

app.use("/login", loginRouter);
app.use("/register", registerRouter);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: true,
  },
  cookie: true,
});

io.on("connection", async (socket) => {
  console.log("A user has connected:", socket.id);

  // Parse cookies from the socket handshake headers
  const cookies = cookie.parse(socket.handshake.headers.cookie || "");
  const loginCookie = cookies.login;

  const chats = await ChatModel.find();

  socket.emit("chatList", chats);

  socket.on("joinRoom", async (room: string) => {
    socket.join(room);

    const chat = await ChatModel.findOne({ name: room });
    socket.emit("roomMessages", chat?.messages);
  });

  socket.on("sendMessage", async (message: string, room: string) => {
    const chatToUpdate = await ChatModel.findOne({ name: room });

    if (chatToUpdate && loginCookie) {
      const user = jwt.decode(loginCookie) as UserDto;

      const newMessage: Message = {
        from: user.username,
        time: new Date(),
        message: message,
      };

      chatToUpdate.messages.push(newMessage);
      await chatToUpdate.save();

      io.to(room).emit("messageReceived", newMessage);
    }
  });
});

server.listen(port, async () => {
  await mongoose.connect(mongoUrl);
  console.log("Api is up and running");
});
