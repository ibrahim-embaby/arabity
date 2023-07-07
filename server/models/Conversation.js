import mongoose from "mongoose";

const ConversationSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    workshopOwnerId: {
      type: String,
      required: true,
    },
    readByUser: {
      type: Boolean,
      required: true,
    },
    readByWorkshopOwner: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = {
  Conversation,
};
