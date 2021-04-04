import Router, {Request, Response} from "express";
import bcrypt from "bcryptjs";

export const userRouter = Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  console.log(req.body);
  return res.send("hell");
});

console.log();
