import Router, {Request, Response} from "express";
import bcrypt from "bcryptjs";
import {Mongoose} from "mongoose";

import User from "../models/user";

export const userRouter = Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  const {username, email, password} = req.body;
  let queryResult = await User.find({email}, (error, result) => {
    if (error) console.log(error);
    result;
  });
  if (queryResult.length > 0)
    return res
      .status(400)
      .send({ErrorCode: 301, Message: "Username or Email already in use"});
  queryResult = await User.find({email}, (error, result) => {
    if (error) console.log(error);
    result;
  });
  if (queryResult.length > 0)
    return res
      .status(400)
      .send({ErrorCode: 301, Message: "Username or Email already in use"});

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  await User.build({
    username,
    email,
    password: hashedPass,
  }).save();
  return res.send("Account is successfuly created");
});

userRouter.post("/login", async (req: Request, res: Response) => {
  const {email, password} = req.body;
  const queryResult = await User.find({email}, (error, result) => {
    if (error) console.log(error);
    result;
  });
  if (queryResult.length === 0)
    return res
      .status(400)
      .send({ErrorCode: 302, Message: "Email or password is not valid."});
  const isPassValid = await bcrypt.compare(password, queryResult[0].password);
  if (!isPassValid)
    return res
      .status(400)
      .send({ErrorCode: 302, Message: "Ue or password is not valid."});
  return res.send({_id: queryResult[0]._id, name: queryResult[0].username});
});
