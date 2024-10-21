import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  particiepants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  Messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});
const conversation = mongoose.model("conversation", conversationSchema);

export default conversation;
