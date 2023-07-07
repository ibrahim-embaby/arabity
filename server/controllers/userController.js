const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
/**
 * @desc get user
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
