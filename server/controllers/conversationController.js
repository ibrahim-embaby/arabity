const asyncHandler = require("express-async-handler");
const { Conversation } = require("../models/Conversation");
const Message = require("../models/Message");
/**
 * @desc chat between mechanic and car owner
 * @route /api/conversations/
 * @method POST
 * @access private (only logged user)
 */
module.exports.createConversationCtrl = asyncHandler(async (req, res) => {
  try {
    const { userId, mechanicId } = req.body;
    const id = userId + mechanicId;
    const isConversationExist = await Conversation.findOne({ id });
    if (isConversationExist) {
      return;
    }
    const newConversation = new Conversation({
      id,
      userId,
      mechanicId,
    });
    await newConversation.save();
    res.status(201).json(newConversation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc get conversations of a user
 * @route /api/conversations
 * @method GET
 * @access private (only user himself)
 */
module.exports.getUserConversationsCtrl = asyncHandler(async (req, res) => {
  try {
    const conversations = await Conversation.find({
      $or: [{ userId: req.user.id }, { mechanicId: req.user.id }],
      lastMessage: { $exists: true, $ne: null },
    })
      .populate("userId", "username profilePhoto")
      .populate("mechanicId", "username profilePhoto workshopName")
      .sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc delete conversation
 * @route /api/conversations/:id
 * @method DELETE
 * @access private (only conversation participants)
 */
module.exports.deleteConversationCtrl = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findOne({ id });
    if (
      req.user.id !== conversation.userId.toString() &&
      req.user.id !== conversation.mechanicId.toString()
    ) {
      return res.status(403).json({ message: req.t("forbbiden") });
    }

    await Message.deleteMany({ conversationId: id });
    const deletedConversation = await Conversation.findOneAndDelete({ id });
    res.status(200).json({
      conversationId: deletedConversation.id,
      message: "conversation deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});
