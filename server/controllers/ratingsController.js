const asyncHandler = require("express-async-handler");
const { WorkshopOwner } = require("../models/WorkshopOwner");
const {
  WorkshopRatings,
  validateCreateRating,
} = require("../models/WorkshopRatings");
const { User } = require("../models/User");
/**
 * @desc rate workshop
 * @route /api/rate
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
