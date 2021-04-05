import exprees from "express";
import mongoose from "mongoose";

import UserModel from "./models/user";
import {userRouter} from "./routes/user";
import {friendListRouter} from "./routes/friendlist";

const app = exprees();
app.use(exprees.json());

mongoose.connect(
  "mongodb+srv://admin:ali.121.BAK@helloworld.jqwpy.mongodb.net/HelloWorld?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/api/user", userRouter);
app.use("/api/friendlist", friendListRouter);

app.listen(3001, () => {
  console.log("server is running on 3001");
});
