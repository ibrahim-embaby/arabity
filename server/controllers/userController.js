const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
/**
 * @desc get user profile
 * @route /api/user/profile/:id
 * @method GET
 * @access private (logged user & admin)
 */
module.exports.getUserCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "هذا المستخدم غير موجود" });
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
    return res.status(404).json({ message: "لا يوجد مستخدمين" });
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
    return res.status(404).json({ message: "هذا المستخدم غير موجود" });
  }
  await User.findByIdAndDelete(id);
  res.status(200).json({ message: "تم حذف المستخدم بنجاح" });
});
