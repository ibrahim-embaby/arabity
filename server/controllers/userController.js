const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");

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
 * @route /api/user/profile/:id
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
 * @desc delete single user
 * @route /api/user/profile/:id
 * @method DELETE
 * @access private ( user himslef & admin)
 */
module.exports.deleteUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: req.t("user_not_found") });
  }
  await User.findByIdAndDelete(id);
  res.status(200).json({ message: req.t("user_deleted") });
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

  const { username, password, mobile } = req.body;

  let newPassword;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(password, salt);
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      ...(username && { username }),
      ...(newPassword && { password: newPassword }),
      ...(mobile && { mobile }),
    },
    {
      new: true,
    }
  );
  const token = updatedUser.generateAuthToken();
  res.status(200).json({
    data: {
      id: updatedUser._id,
      token,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      username: updatedUser.username,
      mobile: updatedUser.mobile,
      password: updatedUser.password,
    },
    message: req.t("data_updated"),
  });
});
