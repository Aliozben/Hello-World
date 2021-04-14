import {Router, Response, Request} from "express";

import verifyId from "../middlewares/verifyId";
import Chat from "../models/chat";
import Message from "../models/message";
import User from "../models/user";

export const chatRouter = Router();

chatRouter.get("/rooms", verifyId, async (req: Request, res: Response) => {
  const {user_id} = req.body;
  const chatRooms = await Chat.find({user_ids: user_id});
  let roomsInfo: {_id: string; name: string | undefined}[] = [];
  for (let room of chatRooms) {
    if (!room.name) {
      let friendID = "";
      room.user_ids.forEach(_id => {
        if (_id !== user_id) friendID = _id;
      });
      const friendInfo = await User.findById(friendID);
      const name = friendInfo?.username;
      roomsInfo.push({_id: room._id, name});
    } else roomsInfo.push({_id: room._id, name: room.name});
  }
  return res.send(roomsInfo);
});

export const getRooms = async (user_id: string) => {
  const chatRooms = await Chat.find({user_ids: user_id});
  let roomsInfo: {
    _id: string;
    name: string | undefined;
    time: Date;
    message: string;
  }[] = [];
  for (let room of chatRooms) {
    const lastMessage = await Message.find({chat_id: room._id})
      .sort({_id: -1})
      .limit(1);
    if (!room.name) {
      let friendID = "";
      room.user_ids.forEach(_id => {
        if (_id !== user_id) friendID = _id;
      });
      const friendInfo = await User.findById(friendID);
      const name = friendInfo?.username;

      roomsInfo.push({
        _id: room._id,
        name,
        time: lastMessage[0].createdAt,
        message: lastMessage[0].message,
      });
    } else
      roomsInfo.push({
        _id: room._id,
        name: room.name,
        time: lastMessage[0].createdAt,
        message: lastMessage[0].message,
      });
  }
  return roomsInfo;
};

export const sendMessage = async (data: any) => {
  const {room_id, message, user_name} = data;
  console.log(data);
  const newMessage = await Message.build({
    chat_id: room_id,
    message,
    message_owner_name: user_name,
  }).save();
  console.log(newMessage);
  return newMessage;
};

chatRouter.post(
  "/allMessages",
  verifyId,
  async (req: Request, res: Response) => {
    const {room_id, user_name} = req.body;
    const messages = await Message.find({chat_id: room_id});
    const x = messages.map((message: any) => {
      return message.message_owner_name !== user_name
        ? {...message._doc, reicived: true}
        : {...message._doc};
    });
    return res.send(x);
  }
);
