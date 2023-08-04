const asyncHandler = require("express-async-handler");
const { Conversation } = require("../models/Conversation");
const Message = require("../models/Message");
/**
 * @desc chat between workshop owner and car owner
 * @route /api/conversations/
 * @method POST
 * @access private (only logged user)
 */
module.exports.createConversationCtrl = asyncHandler(async (req, res) => {
  try {
    const { userId, WorkshopOwnerId } = req.body;
    const id = userId + WorkshopOwnerId;
    const isConversationExist = await Conversation.findOne({ id });
    if (isConversationExist) {
      return;
    }
    const newConversation = new Conversation({
      id,
      userId,
      WorkshopOwnerId,
    });
    await newConversation.save();
    res.status(201).json(newConversation);
  } catch (error) {
    console.log(error);
    res.status(500).json("خطأ في الخادم");
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
      $or: [{ userId: id }, { WorkshopOwnerId: id }],
    })
      .populate("userId", "username")
      .populate("WorkshopOwnerId", "username")
      .sort({ updatedAt: -1 });

    const startedConversations = conversations.filter(
      (conversation) => conversation.lastMessage
    );

    res.status(201).json(startedConversations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});
