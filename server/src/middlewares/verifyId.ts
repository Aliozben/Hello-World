import {Request, Response, NextFunction} from "express";

export = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.header("user_id");
  const username = req.header("user_name");
  if (!_id) return res.status(400).send("Access Denied");

  req.body.user_id = _id;
  req.body.user_name = username;
  next();
};
