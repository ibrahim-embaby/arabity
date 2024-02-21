const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");
const { Conversation } = require("../models/Conversation");
const Message = require("../models/Message");
const { MechanicRating } = require("../models/MechanicRating");
const ErrorResponse = require("../utils/ErrorResponse");

/**
 * @desc get user profile
 * @route /api/user/profile/:id
 * @method GET
 * @access private (logged user & admin)
 */
module.exports.getUserCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: req.t("user_not_found") });
  }
  res.status(200).json(user);
});

/**
 * @desc get all user
 * @route /api/user/
 * @method GET
 * @access private ( admin)
 */
module.exports.getUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(404).json({ message: req.t("no_users") });
  }
  res.status(200).json(users);
});

/**
 * @desc update user data
 * @route /api/user/profile/
 * @method PUT
 * @access private ( user himslef )
 */
module.exports.updateUserCtrl = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: req.t("user_not_found") });
  }

  // Check if the request body contains a new password
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }

  // Update user object with the new data
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });

  res.status(200).json({
    data: {
      id: updatedUser._id,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      username: updatedUser.username,
      mobile: updatedUser.mobile,
      isAccountVerified: updatedUser.isAccountVerified,
      password: updatedUser.password,
    },
    message: req.t("data_updated"),
  });
});

/**
 * @desc delete single user
 * @route /api/user/profile/:id
 * @method DELETE
 * @access private ( user himslef & admin)
 */
module.exports.deleteUserCtrl = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorResponse(req.t("user_not_found"), 404));
    }
    await User.findByIdAndDelete(id);
    await Post.deleteMany({ doc: id });
    await Comment.deleteMany({ doc: id });
    await Conversation.deleteMany({ userId: id });
    await MechanicRating.deleteMany({ user: id });
    const regex = new RegExp(`^${id}`, "i");
    await Message.deleteMany({ conversationId: regex });
    res.status(200).json({ message: req.t("user_deleted") });
  } catch (error) {
    next(error);
  }
});
