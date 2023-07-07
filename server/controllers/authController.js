const asyncHandler = require("express-async-handler");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");
const bcrypt = require("bcrypt");
const {
  validateCreateWorkshopOwner,
  WorkshopOwner,
  validateLoginWorkshopOwner,
} = require("../models/WorkshopOwner");

/**
 * @desc register user
 * @route /api/auth/register
 * @method POST
 * @access public
 */
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(500)
      .json({ message: "هذا المستخدم موجود من قبل، من فضلك قم بتسجيل الدخول" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    mobile: req.body.mobile,
  });
  await user.save();

  res.status(201).json("تم إنشاء الحساب، من فضلك قم بتسجيل الدخول");
});

/**
 * @desc login user
 * @route /api/auth/login
 * @method POST
 * @access public
 */
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      message: "هذا المستخدم غير موجود، من فضلك قم بإنشاء حساب أولًا",
    });
  }
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "كلمة المرور غير صحيحة" });
  }
  const token = user.generateAuthToken();

  res.status(200).json({
    id: user._id,
    token,
    email: user.email,
    isAdmin: user.isAdmin,
    username: user.username,
  });
});

/**
 * @desc register workshop owner
 * @route /api/auth/workshop-owner/register
 * @method POST
 * @access public
 */
module.exports.registerWorkshopOwnerCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateWorkshopOwner(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let workshopOwner = await WorkshopOwner.findOne({ email: req.body.email });
  if (workshopOwner) {
    return res
      .status(400)
      .json({ message: "هذا الحساب موجود بالفعل، من فضلك قم بتسجيل الدخول" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  workshopOwner = new WorkshopOwner({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    workshopName: req.body.workshopName,
    workshopBranches: req.body.workshopBranches,
    workshopServices: req.body.workshopServices,
    cars: req.body.cars,
  });

  const savedWorkshopOwner = await workshopOwner.save();
  res
    .status(201)
    .json({ message: "تم إنشاء الحساب بنجاح", data: savedWorkshopOwner });
});

/**
 * @desc login workshop owner
 * @route /api/auth/workshop-owner/login
 * @method POST
 * @access public
 */

module.exports.loginWorkshopOwnerCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginWorkshopOwner(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const workshopOwner = await WorkshopOwner.findOne({ email: req.body.email });
  if (!workshopOwner) {
    return res.status(404).json({
      message: "هذا المستخدم غير موجود، من فضلك قم بإنشاء حساب أولًا",
    });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    workshopOwner.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "كلمة المرور غير صحيحة" });
  }

  const token = workshopOwner.generateAuthToken();

  return res.status(200).json({
    id: workshopOwner._id,
    token,
    username: workshopOwner.username,
    workshopName: workshopOwner.workshopName,
  });
});
