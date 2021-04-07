import express from "express";
import http, {createServer} from "http";
import mongoose from "mongoose";
import SocketIO, {Server, Socket} from "socket.io";

import UserModel from "./models/user";
import {userRouter} from "./routes/user";
import {friendListRouter} from "./routes/friendlist";

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

server.listen(3001, () => {
  console.log("server is running on 3001");
});
