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
 * @route /api/conversations/:id
 * @method GET
 * @access private (only user himself)
 */
module.exports.getUserConversationsCtrl = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const conversations = await Conversation.find({
      $or: [{ userId: id }, { mechanicId: id }],
    })
      .populate("userId", "username")
      .populate("mechanicId", "username")
      .sort({ updatedAt: -1 });

    const startedConversations = conversations.filter(
      (conversation) => conversation.lastMessage
    );

    res.status(200).json(startedConversations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});
