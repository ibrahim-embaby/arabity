const {
  createCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
} = require("../controllers/commentController");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.route("/").post(verifyToken, createCommentCtrl);

// /api/comments/:id
router
  .route("/:id")
  .put(verifyToken, updateCommentCtrl)
  .delete(verifyToken, deleteCommentCtrl);

module.exports = router;
