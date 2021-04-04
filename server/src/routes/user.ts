import Router, {Request, Response} from "express";
import bcrypt from "bcryptjs";

import User from "../models/user";
import {Mongoose} from "mongoose";
export const userRouter = Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  const {username, email, password} = req.body;
  const queryResult = await User.find({email}, (error, result) => {
    if (error) console.log(error);
    result;
  });
  console.log(queryResult.length);
  if (queryResult.length > 0)
    return res
      .status(400)
      .send({ErrorCode: 301, Message: "Username or Email already in use"});

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  // await User.build({
  //   username,
  //   email,
  //   password: hashedPass,
  // }).save();
  console.log("hell");
});
