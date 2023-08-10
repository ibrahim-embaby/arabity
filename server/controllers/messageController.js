const asyncHandler = require("express-async-handler");
const Message = require("../models/Message");
const { Conversation } = require("../models/Conversation");

/**
 * @desc create message
 * @route /api/messages
 * @method POST
 * @access private (logged user only)
 */
module.exports.createMessageCtrl = asyncHandler(async (req, res) => {
  try {
    const { conversationId, sentBy, messageType, messageText } = req.body;
    const newMessage = new Message({
      conversationId,
      messageType,
      sentBy,
      message: messageText,
      imageUrl: messageType === "image" ? req.file.path : null,
    });
    await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: conversationId },
      { $set: { lastMessage: messageText } },
      { new: true }
    );
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

/**
 * @desc get the messages between two users
 * @route /api/messages/:conversationId
 * @method GET
 * @access private (logged user only)
 */
module.exports.getChatMessagesCtrl = asyncHandler(async (req, res) => {
  try {
    const { conversationId } = req.params;
    if (
      req.user.id !== conversationId.substring(0, 24) &&
      req.user.id !== conversationId.substring(24, 48)
    ) {
      return res.status(403).json({ message: "لا يمكنك عرض هذه المحادثة" });
    }
    const messages = await Message.find({ conversationId });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

/**
 * @desc delete messages
 * @route /api/messages/
 * @method DELETE
 * @access private (logged user only)
 */
module.exports.deleteMessagesCtrl = asyncHandler(async (req, res) => {
  try {
    const messageIds = req.body;
    if (!Array.isArray(messageIds) || messageIds.length === 0) {
      return res
        .status(400)
        .json({ message: "يرجي تحديد الرسائل التي تريد حذفها" });
    }

    await Message.deleteMany({ _id: { $in: messageIds } });

    res.status(200).json({ message: "تم حذف الرسالة بنجاح" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});
