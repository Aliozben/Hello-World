import {Router, Response, Request} from "express";
import {} from "bcryptjs";

import verifyId from "../middlewares/verifyId";
import Chat from "../models/chat";
import Message, {MessageDoc} from "../models/message";
import User from "../models/user";
import {cryptText, decryptText} from "../utils/utilMetods";

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
        message: decryptText(lastMessage[0].message),
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
  const cryptedMessage = cryptText(message);
  const newMessage = await Message.build({
    chat_id: room_id,
    message: cryptedMessage,
    message_owner_name: user_name,
  }).save();
  newMessage.message = message;
  console.log("message has been send -> ", newMessage);
  return newMessage;
};

chatRouter.post(
  "/allMessages",
  verifyId,
  async (req: Request, res: Response) => {
    const {room_id, user_name} = req.body;
    const messages = await Message.find({chat_id: room_id});
    const x = messages.map((message: any) => {
      try {
        message.message = decryptText(message.message);
        return message.message_owner_name !== user_name
          ? {...message._doc, reicived: true}
          : message;
      } catch (err) {
        console.log(err);
      }
    });
    return res.send(x);
  }
);

chatRouter.post("/newChat", verifyId, async (req: Request, res: Response) => {
  const users = await User.find({username: req.body.names});
  const user_ids: string[] = users.map(user => {
    return user._id.toString();
  });
  const chatInfo = await Chat.build({
    user_ids,
  }).save();
  console.log("created a new chat room ->", chatInfo);
  return res.send(chatInfo);
});

chatRouter.post(
  "/getNewFriend",
  verifyId,
  async (req: Request, res: Response) => {
    console.log(req.body);
    const {friendList, user_id} = req.body;
    let alreadyFriend = undefined;
    let newFriendInfo: any[];
    do {
      newFriendInfo = await User.aggregate([{$sample: {size: 1}}]);
      alreadyFriend = await friendList.find(
        (friend: {_id: string; username: string}) =>
          friend._id == newFriendInfo[0]._id
      );
    } while (alreadyFriend !== undefined || user_id == newFriendInfo[0]._id);
    return res.send(newFriendInfo);
  }
);
