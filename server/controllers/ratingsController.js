const asyncHandler = require("express-async-handler");
const { WorkshopOwner } = require("../models/WorkshopOwner");
const {
  WorkshopRatings,
  validateCreateRating,
} = require("../models/WorkshopRatings");
const { User } = require("../models/User");

/**
 * @desc rate workshop
 * @route /api/ratings
 * @method POST
 * @access private (only logged user)
 */
module.exports.rateWorkshopCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateRating(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const workshopOwner = await WorkshopOwner.findById(req.body.workshopOwner);
  if (!workshopOwner) {
    return res.status(404).json({ message: "هذا المستخدم غير موجود" });
  }
  const user = await User.findById(req.user.id);

  const rating = await WorkshopRatings.create({
    user: user,
    workshopOwner: workshopOwner,
    rating: req.body.rating,
    text: req.body.text,
    username: user.username,
  });

  return res.status(201).json(rating);
});

/**
 * @desc delete rating workshop
 * @route /api/ratings/:id
 * @method DELETE
 * @access private (only user himself)
 */
module.exports.deleteRatingCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const rating = await WorkshopRatings.findById(id);

  if (rating && (req.user.id === rating.user.toString() || req.user.isAdmin)) {
    const deletedRating = await WorkshopRatings.findByIdAndDelete(id);
    res
      .status(200)
      .json({ ratingId: deletedRating._id, message: "تم حذف المراجعة بنجاح" });
  } else {
    res.status(500).json({ message: "حدث شئ خاطئ" });
  }
});

/**
 * @desc get all user ratings
 * @route /api/ratings/:userId
 * @method GET
 * @access private (only user himself)
 */
module.exports.getSingleUserRatings = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (req.user.id !== userId) {
    return res.status(400).json({ message: "دخول غير مسموح" });
  }
  const userRatings = await WorkshopRatings.find({ user: userId }).populate(
    "workshopOwner"
  );

  res.status(200).json(userRatings);
});

/**
 * @desc get all ratings
 * @route /api/ratings
 * @method GET
 * @access private (only Admin)
 */
module.exports.getAllRatings = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "دخول غير مسموح" });
  }

  const ratings = await WorkshopRatings.find();
  res.status(200).json(ratings);
});
