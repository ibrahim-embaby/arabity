const router = require("express").Router();
const {
  createMessageCtrl,
  getChatMessagesCtrl,
  deleteMessagesCtrl,
} = require("../controllers/messageController");
const {
  verifyToken,
  verifyTokenAndOnlyUser,
} = require("../middlewares/verifyToken");

// /api/messages/
router
  .route("/")
  .post(verifyToken, createMessageCtrl)
  .delete(verifyTokenAndOnlyUser, deleteMessagesCtrl);

// /api/messages/:conversationId
router.route("/:conversationId").get(verifyToken, getChatMessagesCtrl);
module.exports = router;
