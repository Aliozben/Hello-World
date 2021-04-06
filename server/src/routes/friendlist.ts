import Router, {Request, Response} from "express";

import FriendList from "../models/friendList";
import User from "../models/user";
import verifyHeader from "../middlewares/verifyId";

export const friendListRouter = Router();

friendListRouter.get(
  "/getallfriend",
  verifyHeader,
  async (req: Request, res: Response) => {
    const {user_id} = req.body;
    const friendsID = await FriendList.find({user_id});
    let friendsInfo: {_id: string; username: string | undefined}[] = [];
    for (let i = 0; i < friendsID[0].friend_id_array.length; i++) {
      const userInfo = await User.findById(friendsID[0].friend_id_array[i]);
      friendsInfo.push({_id: userInfo?._id, username: userInfo?.username});
    }
    return res.send(friendsInfo);
  }
);
