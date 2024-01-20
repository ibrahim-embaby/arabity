const asyncHandler = require("express-async-handler");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");
const bcrypt = require("bcrypt");

const {
  Mechanic,
  validateCreateMechanic,
  validateLoginMechanic,
} = require("../models/Mechanic");

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
    return res.status(500).json({ message: req.t("account_exist") });
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

  res.status(201).json(req.t("account_created"));
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
      message: req.t("incorrect_login_data"),
    });
  }
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: req.t("incorrect_login_data") });
  }
  const token = user.generateAuthToken();

  res.status(200).json({
    id: user._id,
    token,
    email: user.email,
    isAdmin: user.isAdmin,
    username: user.username,
    profilePhoto: user.profilePhoto,
  });
});

/**
 * @desc register workshop owner
 * @route /api/auth/mechanic/register
 * @method POST
 * @access public
 */
module.exports.registerMechanicCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateMechanic(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let mechanic = await Mechanic.findOne({ email: req.body.email });
  if (mechanic) {
    return res.status(400).json({ message: req.t("account_exist") });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  mechanic = new Mechanic({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    workshopName: req.body.workshopName,
    workshopBranches: req.body.workshopBranches,
    workshopServices: req.body.workshopServices,
    cars: req.body.cars,
  });

  const savedWorkshopOwner = await mechanic.save();
  res
    .status(201)
    .json({ message: req.t("account_created"), data: savedWorkshopOwner });
});

/**
 * @desc login workshop owner
 * @route /api/auth/mechanic/login
 * @method POST
 * @access public
 */
module.exports.loginMechanicCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginMechanic(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const mechanic = await Mechanic.findOne({ email: req.body.email });
  if (!mechanic) {
    return res.status(404).json({
      message: req.t("incorrect_login_data"),
    });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    mechanic.password
  );

  if (!isPasswordMatch) {
    return res.status(400).json({ message: req.t("incorrect_login_data") });
  }

  const token = mechanic.generateAuthToken();

  return res.status(200).json({
    id: mechanic._id,
    token,
    email: mechanic.email,
    username: mechanic.username,
    workshopName: mechanic.workshopName,
    profilePhoto: mechanic.profilePhoto,
  });
});
