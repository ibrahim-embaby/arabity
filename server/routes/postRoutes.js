const router = require("express").Router();
const {
  createPostCtrl,
  getAllUserPostsCtrl,
  getSinglePostCtrl,
  updateSinglePostCtrl,
  deleteSinglePostCtrl,
  unlikePostCtrl,
  likePostCtrl,
  getAllPublicPostsCtrl,
} = require("../controllers/postController");
const { verifyToken } = require("../middlewares/verifyToken");

// /api/posts
router.route("/").post(verifyToken, createPostCtrl).get(getAllPublicPostsCtrl);

// /api/posts/:userId
router.route("/user/:userId").get(getAllUserPostsCtrl);

// /api/posts/:postId
router
  .route("/:postId")
  .get(getSinglePostCtrl)
  .put(verifyToken, updateSinglePostCtrl)
  .delete(verifyToken, deleteSinglePostCtrl);

// /api/posts/:postId/like
router.route("/:postId/like").put(verifyToken, likePostCtrl);
// /api/posts/:postId/like
router.route("/:postId/unlike").put(verifyToken, unlikePostCtrl);

module.exports = router;
