import mongoose, {mongo, Schema} from "mongoose";

const messageSchema = new Schema(
  {
    message_owner_id: {type: String, reqired: true},
    chat_id: {type: String, required: true},
    message: {type: String, required: true},
  },
  {timestamps: true}
);
interface IMessage {
  message_owner_id: string;
  chat_id: string;
  message: string;
}
interface MessageDoc extends mongoose.Document {
  message_owner_id: string;
  chat_id: string;
  message: string;
}
interface messageModelSchema extends mongoose.Model<MessageDoc> {
  build(attr: IMessage): MessageDoc;
}
messageSchema.statics.build = (attr: IMessage) => {
  return new Message(attr);
};
const Message = mongoose.model<any, messageModelSchema>(
  "Message",
  messageSchema
);
export default Message;
