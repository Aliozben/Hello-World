import {Router, Response, Request} from "express";
import verifyId from "../middlewares/verifyId";
import Chat from "../models/chat";
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
      console.log(friendInfo);
      const name = friendInfo?.username;
      roomsInfo.push({_id: room._id, name});
    } else roomsInfo.push({_id: room._id, name: room.name});
  }
  return res.send(roomsInfo);
});
