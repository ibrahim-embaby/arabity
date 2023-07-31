const router = require("express").Router();
const {
  createConversationCtrl,
  getUserConversationsCtrl,
} = require("../controllers/conversationController");
const {
  verifyToken,
  verifyTokenAndOnlyUser,
} = require("../middlewares/verifyToken");

//  /api/conversations/
router.route("/").post(verifyToken, createConversationCtrl);

// /api/conversations/:id
router.route("/:id").get(verifyTokenAndOnlyUser, getUserConversationsCtrl);

module.exports = router;
