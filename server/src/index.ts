import express from "express";
import {createServer} from "http";
import mongoose from "mongoose";
import {Server, Socket} from "socket.io";

import {userRouter} from "./routes/user";
import {friendListRouter} from "./routes/friendlist";
import {chatRouter, getRooms, sendMessage} from "./routes/chat";
import Message from "./models/message";

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
  const {_id} = socket.handshake.query;
  socket.on("get-rooms", (data, callback) =>
    getRooms(data.user_id).then(res => {
      res.forEach(room => {
        socket.join(room._id.toString());
      });
      callback(res);
    })
  );
  socket.on("send-message", async data => {
    const message = await sendMessage(data);
    console.log(message);
    socket.to(data.room_id).emit("new-message", message);
  });
});
server.listen(3001, () => {
  console.log("server is running on 3001");
});
