const router = require("express").Router();
const {
  createConversationCtrl,
  getUserConversationsCtrl,
  deleteConversationCtrl,
} = require("../controllers/conversationController");
const { verifyToken } = require("../middlewares/verifyToken");

//  /api/conversations/
router
  .route("/")
  .post(verifyToken, createConversationCtrl)
  .get(verifyToken, getUserConversationsCtrl);

// /api/conversations/:id
router.route("/:id").delete(verifyToken, deleteConversationCtrl);

module.exports = router;
