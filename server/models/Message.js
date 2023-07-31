const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    sentBy: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image"],
    },
    message: String,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
