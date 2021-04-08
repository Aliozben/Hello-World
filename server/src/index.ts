import express from "express";
import {createServer} from "http";
import mongoose from "mongoose";
import {Server, Socket} from "socket.io";

import {userRouter} from "./routes/user";
import {friendListRouter} from "./routes/friendlist";
import {chatRouter} from "./routes/chat";
import Chat from "./models/chat";

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket: Socket) => {});
app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:ali.121.BAK@helloworld.jqwpy.mongodb.net/HelloWorld?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use("/api/user", userRouter);
app.use("/api/friendlist", friendListRouter);
app.use("/api/chat", chatRouter);

server.listen(3001, () => {
  console.log("server is running on 3001");
});
