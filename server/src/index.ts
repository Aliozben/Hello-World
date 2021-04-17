import express from "express";
import {createServer} from "http";
import mongoose from "mongoose";
import {Server, Socket} from "socket.io";
import dotenv from "dotenv";

import {userRouter} from "./routes/user";
import {friendListRouter} from "./routes/friendlist";
import {chatRouter, getRooms, sendMessage} from "./routes/chat";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server);

mongoose.connect(process.env.DATABASE_URL!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/friendlist", friendListRouter);
app.use("/api/chat", chatRouter);

io.on("connection", (socket: Socket) => {
  const {_id} = socket.handshake.query;
  socket.on(
    "get-rooms",
    async (data, cb) =>
      await getRooms(data.user_id).then(res => {
        res.forEach(room => {
          socket.join(room._id.toString());
        });
        cb(res);
      })
  );
  socket.on("send-message", async (data, cb) => {
    const message = await sendMessage(data);
    socket.to(data.room_id.toString()).emit("new-message", message);
    cb(message);
  });
});
server.listen(3001, () => {
  console.log("server is running on 3001");
});
