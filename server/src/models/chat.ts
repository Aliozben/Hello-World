import mongoose, {mongo, Schema} from "mongoose";

const chatSchema = new Schema({
  user_ids: {type: [], reqired: true},
  name: {type: String},
});
interface IChat {
  user_ids: string[];
  name?: string;
}
interface ChatDoc extends mongoose.Document {
  user_ids: string[];
  name?: string;
}
interface chatModelInterface extends mongoose.Model<ChatDoc> {
  build(attr: IChat): ChatDoc;
}
chatSchema.statics.build = (attr: IChat) => {
  return new Chat(attr);
};
const Chat = mongoose.model<any, chatModelInterface>("Chat", chatSchema);
export default Chat;
