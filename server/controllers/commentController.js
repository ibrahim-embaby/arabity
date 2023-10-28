const asyncHandler = require("express-async-handler");
const { Comment, validateCreateComment } = require("../models/Comment");
const { Post } = require("../models/Post");

/**
 * @desc create comment
 * @route /api/comments/
 * @method POST
 * @access private (only logged user)
 */
module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
  try {
    const { postId, text } = req.body;
    const { error } = validateCreateComment({
      ...req.body,
      doc: req.user.id,
      docModel: req.user.userType,
    });
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    let comment = await Comment.create({
      doc: req.user.id,
      docModel: req.user.userType,
      text,
      postId,
    });
    comment = await comment.populate("doc", "username profilePhoto _id");
    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc update comment
 * @route /api/comments/:id
 * @method PUT
 * @access private (only logged user)
 */
module.exports.updateCommentCtrl = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    let comment = await Comment.findById(id);
    if (!comment)
      return res.status(404).json({ message: req.t("comment_not_found") });
    if (req.user.id !== comment.doc.toString()) {
      return res.status(301).json({ message: req.t("forbidden") });
    }
    comment = await Comment.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    ).populate("doc", "username profilePhoto _id");
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc delete comment
 * @route /api/comments/:id
 * @method DELETE
 * @access private (only logged user)
 */
module.exports.deleteCommentCtrl = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let comment = await Comment.findById(id);
    if (!comment)
      return res.status(404).json({ message: req.t("comment_not_found") });
    if (req.user.id !== comment.doc.toString()) {
      return res.status(301).json({ message: req.t("forbidden") });
    }
    comment = await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: req.t("comment_deleted") });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});
