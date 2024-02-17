const asyncHandler = require("express-async-handler");
const { Comment, validateCreateComment } = require("../models/Comment");
const { Post } = require("../models/Post");
const ErrorResponse = require("../utils/ErrorResponse");

/**
 * @desc create comment
 * @route /api/comments/
 * @method POST
 * @access private (only logged user)
 */
module.exports.createCommentCtrl = asyncHandler(async (req, res, next) => {
  try {
    const { postId, text } = req.body;
    const { error } = validateCreateComment({
      ...req.body,
      doc: req.user.id,
      docModel: req.user.userType,
    });
    if (error)
      return next(new ErrorResponse(error.details[0].message ,400)) 

    const postFound = await Post.findById(postId)
    if(!postFound) return next(new ErrorResponse("post not found", 404))

    let comment = await Comment.create({
      doc: req.user.id,
      docModel: req.user.userType,
      text,
      postId,
    });
    comment = await comment.populate(
      "doc",
      "username profilePhoto _id workshopName"
    );
    res.status(201).json(comment);
  } catch (error) {
    next(error)
  }
});

/**
 * @desc update comment
 * @route /api/comments/:id
 * @method PUT
 * @access private (only logged user)
 */
module.exports.updateCommentCtrl = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    let comment = await Comment.findById(id);
    if (!comment)
      return next(new ErrorResponse(req.t("comment_not_found") ,404)) 
    if (req.user.id !== comment.doc.toString()) {
      return next(new ErrorResponse(req.t("forbidden") ,301)) 
    }
    comment = await Comment.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    ).populate("doc", "username profilePhoto _id workshopName");
    res.status(200).json(comment);
  } catch (error) {
    next(error)
  }
});

/**
 * @desc delete comment
 * @route /api/comments/:id
 * @method DELETE
 * @access private (only logged user)
 */
module.exports.deleteCommentCtrl = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    let comment = await Comment.findById(id);
    if (!comment) return next(new ErrorResponse(req.t("comment_not_found"), 404))

    if (req.user.id !== comment.doc.toString()) {
      return next(new ErrorResponse(req.t("forbidden") , 301))
    }
    comment = await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: req.t("comment_deleted") });
  } catch (error) {
    next(error)
  }
});
