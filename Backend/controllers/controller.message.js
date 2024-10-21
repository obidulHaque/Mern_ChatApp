import Message from "../model/messageModel.js";
import conversation from "../model/conversation.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: reciverId } = req.params;
    const { message } = req.body;

    let Conversation = await conversation.findOne({
      particiepants: { $all: [senderId, reciverId] },
    });
    if (!Conversation) {
      Conversation = await conversation.create({
        particiepants: [senderId, reciverId],
      });
    }
    const newMessage = new Message({
      senderId,
      reciverId,
      message,
    });
    if (newMessage) {
      Conversation.Messages.push(newMessage._id);
    }
    await Promise.all([Conversation.save(), newMessage.save()]);
    /// socket
    const receiverSocketId = getReceiverSocketId(reciverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("send Message Error:", error.message);
    res.status(500).json({ error: "Send Message error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: senderId } = req.params;
    const reciverId = req.user._id;

    const Conversation = await conversation
      .findOne({
        particiepants: { $all: [senderId, reciverId] },
      })
      .populate("Messages");
    if (!Conversation) {
      return res.status(200).json([]);
    }
    const message = Conversation.Messages;
    res.json(message);
  } catch (error) {
    console.log("Get  Message Error:", error.message);
    res.status(500).json({ error: "get message error" });
  }
};
