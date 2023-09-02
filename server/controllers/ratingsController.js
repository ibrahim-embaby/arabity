const asyncHandler = require("express-async-handler");
const { Mechanic } = require("../models/Mechanic");
const {
  MechanicRating,
  validateCreateRating,
} = require("../models/MechanicRating");
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
  const isUserRatedThisMechanicBefore = await MechanicRating.findOne({
    user: req.user.id,
    mechanic: req.body.mechanic,
  });
  if (isUserRatedThisMechanicBefore)
    return res.status(400).json({ message: req.t("rated_before") });
  const mechanic = await Mechanic.findById(req.body.mechanic);
  if (!mechanic) {
    return res.status(404).json({ message: req.t("user_not_found") });
  }
  const user = await User.findById(req.user.id);

  const rating = await MechanicRating.create({
    user,
    mechanic,
    rating: req.body.rating,
    text: req.body.text,
  });

  return res.status(201).json({ rating, message: req.t("rating_created") });
});

/**
 * @desc delete rating workshop
 * @route /api/ratings/:id
 * @method DELETE
 * @access private (only user himself)
 */
module.exports.deleteRatingCtrl = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await MechanicRating.findById(id);

    if (
      rating &&
      (req.user.id === rating.user.toString() || req.user.isAdmin)
    ) {
      const deletedRating = await MechanicRating.findByIdAndDelete(id);
      res.status(200).json({
        ratingId: deletedRating._id,
        message: req.t("rating_deleted"),
      });
    } else {
      res.status(500).json({ message: req.t("not_deleted") });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
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
    return res.status(400).json({ message: req.t("forbidden") });
  }
  const userRatings = await MechanicRating.find({ user: userId }).populate(
    "mechanic"
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
    return res.status(403).json({ message: req.t("forbidden") });
  }

  const ratings = await MechanicRating.find().populate("user", "username");
  res.status(200).json(ratings);
});
