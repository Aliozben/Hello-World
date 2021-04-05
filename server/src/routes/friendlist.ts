import Router, {Request, Response} from "express";

import FriendList from "../models/friendList";
import User from "../models/user";

export const friendListRouter = Router();

friendListRouter.get("/getallfriend", async (req: Request, res: Response) => {
  const {user_id} = req.headers;
  if (!user_id)
    return res.status(400).send({ErrorCode: 400, Message: "Bad Request"});
  const friendsID = await FriendList.find({user_id});
  let users: any[] = [];
  console.log(friendsID[0].friend_id_array);
  return;
  //   return res.send(queryResult[0].friend_id_array);
});
