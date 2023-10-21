const router = require("express").Router();
const {
  createPostCtrl,
  getAllUserPostsCtrl,
  getSinglePostCtrl,
  updateSinglePostCtrl,
  deleteSinglePostCtrl,
} = require("../controllers/postController");
const { verifyToken } = require("../middlewares/verifyToken");

// /api/posts
router.route("/").post(verifyToken, createPostCtrl);

// /api/posts/:userId
router.route("/user/:userId").get(getAllUserPostsCtrl);

// /api/posts/:postId
router
  .route("/:postId")
  .get(getSinglePostCtrl)
  .put(verifyToken, updateSinglePostCtrl)
  .delete(verifyToken, deleteSinglePostCtrl);

module.exports = router;
