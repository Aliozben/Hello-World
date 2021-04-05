import mongoose, {mongo, Schema} from "mongoose";

const friendListSchema = new Schema({
  user_id: {type: String, required: true},
  friend_id_array: {type: []},
});
interface IFriendList {
  user_id: string;
  friend_id_array: string[];
}
interface FriendListDoc extends mongoose.Document {
  user_id: string | string[];
  friend_id_array: string[];
}
interface friendListModelInterface extends mongoose.Model<FriendListDoc> {
  build(attr: IFriendList): FriendListDoc;
}
friendListSchema.statics.build = (attr: IFriendList) => {
  return new FriendList(attr);
};
const FriendList = mongoose.model<any, friendListModelInterface>(
  "FriendList",
  friendListSchema
);
export default FriendList;
