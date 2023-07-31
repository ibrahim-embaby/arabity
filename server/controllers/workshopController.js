const asyncHandler = require("express-async-handler");
const { WorkshopOwner } = require("../models/WorkshopOwner");
const { WorkshopRatings } = require("../models/WorkshopRatings");

/**
 * @desc get workshop owner
 * @route /api/workshop-owner/:id
 * @method GET
 * @access public
 */
module.exports.getWorkshopOwnerCtrl = asyncHandler(async (req, res) => {
  const workshopOwner = await WorkshopOwner.findById(req.params.id)
    .select("-password")
    .populate("workshopRatings");

  if (!workshopOwner) {
    return res.status(404).json({ message: "هذا المستخدم غير موجود" });
  }
  res.status(200).json(workshopOwner);
});

/**
 * @desc delete workshop owner
 * @route /api/workshop-owner/:id
 * @method DELETE
 * @access private (only user himself & admin)
 */
module.exports.deleteWorkshopOwnerCtrl = asyncHandler(async (req, res) => {
  const workshopOwner = await WorkshopOwner.findById(req.params.id);
  if (!workshopOwner) {
    return res.status(404).json({ message: "هذا المستخدم غير موجود" });
  }
  await WorkshopOwner.deleteOne({ _id: workshopOwner._id });
  await WorkshopRatings.deleteMany({ workshopOwner: workshopOwner._id });
  return res.status(200).json({ message: "تم حذف الحساب بنجاح" });
});

/**
 * @desc report workshop owner
 * @route /api/workshop-owner/:id
 * @method PUT
 * @access private (only logged user)
 */
module.exports.reportWorkshopOwnerCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const workshopOwner = await WorkshopOwner.findById(id);
  if (!workshopOwner) {
    return res.status(404).json({ message: "هذا المستخدم غير موجود" });
  }

  await WorkshopOwner.findByIdAndUpdate(id, {
    reports: { $push: { user: req.user.id, text } },
  });
  res.status(200).json({ workshop: workshopOwner, message: "تم ارسال بلاغك" });
});
