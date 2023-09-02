const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    mechanicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mechanic",
    },
    lastMessage: String,
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = { Conversation };
