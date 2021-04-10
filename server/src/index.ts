import express from "express";
import {createServer} from "http";
import mongoose from "mongoose";
import {Server, Socket} from "socket.io";

import {userRouter} from "./routes/user";
import {friendListRouter} from "./routes/friendlist";
import {chatRouter, getRooms} from "./routes/chat";
import message from "./models/message";

const app = express();
const server = createServer(app);
const io = new Server(server);

mongoose.connect(
  "mongodb+srv://admin:ali.121.BAK@helloworld.jqwpy.mongodb.net/HelloWorld?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/friendlist", friendListRouter);
app.use("/api/chat", chatRouter);

io.on("connection", (socket: Socket) => {
  socket.on("get-rooms", (data, callback) =>
    getRooms(data.user_id).then(res => {
      res.forEach(room => {
        socket.join(room._id);
      });
      callback(res);
    })
  );
});

server.listen(3001, () => {
  console.log("server is running on 3001");
});
