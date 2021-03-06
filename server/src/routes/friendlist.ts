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
    if (friendsID.length === 0) return;
    let friendsInfo: {_id: string; username: string | undefined}[] = [];
    for (let i = 0; i < friendsID[0].friend_id_array.length; i++) {
      const userInfo = await User.findById(friendsID[0].friend_id_array[i]);
      friendsInfo.push({_id: userInfo?._id, username: userInfo?.username});
    }
    return res.send(friendsInfo);
  }
);

friendListRouter.post(
  "/addFriend",
  verifyHeader,
  async (req: Request, res: Response) => {
    const {names, user_id} = req.body;
    console.log(req.body);
    try {
      const friend = await User.find({username: names[0]});
      await FriendList.find({user_id}).then(res => {
        if (!res[0])
          FriendList.build({
            friend_id_array: [friend[0]._id.toString()],
            user_id,
          }).save();
        return;
      });

      await FriendList.updateOne(
        {user_id},
        {$addToSet: {friend_id_array: friend[0]._id.toString()}},
        {multi: true}
      );
    } catch (error) {
      throw error;
    }
  }
);
