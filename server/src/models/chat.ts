import mongoose, {mongo, Schema} from "mongoose";

const chatSchema = new Schema({
  users: {type: [], reqired: true},
});
interface IChat {
  users: string[];
}
interface ChatDoc extends mongoose.Document {
  users: string[];
}
interface chatModelInterface extends mongoose.Model<ChatDoc> {
  build(attr: IChat): ChatDoc;
}
chatSchema.statics.build = (attr: IChat) => {
  return new Chat(attr);
};
const Chat = mongoose.model<any, chatModelInterface>("Chat", chatSchema);
export default Chat;
