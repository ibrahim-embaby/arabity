const asyncHandler = require("express-async-handler");
const { validateCreatePost, Post } = require("../models/Post");

/**
 * @desc create post
 * @route /api/posts/
 * @method POST
 * @access private (logged user only)
 */
module.exports.createPostCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateCreatePost(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { text } = req.body;
    let newPost = await Post.create({
      text,
      doc: req.user.id,
      docModel: req.user.userType,
    });
    newPost = await newPost.populate("doc", "username profilePhoto _id");
    res.status(201).json({ data: newPost, message: req.t("post_created") });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc get all user posts
 * @route /api/posts/user/:userId
 * @method GET
 * @access public
 */
module.exports.getAllUserPostsCtrl = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ doc: userId })
      .populate("doc", "username profilePhoto _id")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc get single post
 * @route /api/posts/:postId
 * @method GET
 * @access public
 */
module.exports.getSinglePostCtrl = asyncHandler(async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(postId);
    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ message: req.t("post_not_found") });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc update post
 * @route /api/posts/:postId
 * @method PUT
 * @access private (only user himself)
 */
module.exports.updateSinglePostCtrl = asyncHandler(async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ message: req.t("post_not_found") });
    const userId = post.doc;
    if (userId.toString() !== req.user.id) {
      return res.status(301).json({ message: req.t("forbidden") });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { text },
      { new: true }
    );
    res.status(200).json({ data: updatedPost, message: req.t("post_edit") });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc delete post
 * @route /api/posts/:postId
 * @method DELETE
 * @access private (only user himself)
 */
module.exports.deleteSinglePostCtrl = asyncHandler(async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ message: req.t("post_not_found") });
    const userId = post.doc;
    if (userId.toString() !== req.user.id) {
      return res.status(301).json({ message: req.t("forbidden") });
    }
    const deletedPost = await Post.findByIdAndDelete(postId);
    res.status(200).json({ data: deletedPost, message: req.t("post_deleted") });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});
