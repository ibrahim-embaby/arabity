const asyncHandler = require("express-async-handler");
const { WorkshopOwner } = require("../models/WorkshopOwner");
const { WorkshopRatings } = require("../models/WorkshopRatings");
const path = require("path");
const {
  cloudinaryImageUpload,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const fs = require("fs");
/**
 * @desc get workshop owner
 * @route /api/workshop-owner/:id
 * @method GET
 * @access public
 */
module.exports.getWorkshopOwnerCtrl = asyncHandler(async (req, res) => {
  const workshopOwner = await WorkshopOwner.findById(req.params.id)
    .select("-password")
    .populate({
      path: "workshopRatings",
      populate: {
        path: "user",
        select: "username",
      },
    });

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

// /**
//  * @desc delete many workshop owners
//  * @route /api/workshop-owner/
//  * @method DELETE
//  * @access private (only admin)
//  */
// module.exports.deleteWorkshopOwnerCtrl = asyncHandler(async (req, res) => {
//   const workshopOwner = await WorkshopOwner.findById(req.params.id);
//   if (!workshopOwner) {
//     return res.status(404).json({ message: "هذا المستخدم غير موجود" });
//   }
//   await WorkshopOwner.deleteOne({ _id: workshopOwner._id });
//   await WorkshopRatings.deleteMany({ workshopOwner: workshopOwner._id });
//   return res.status(200).json({ message: "تم حذف الحساب بنجاح" });
// });

/**
 * @desc report workshop owner
 * @route /api/workshop-owner/:id
 * @method PUT
 * @access private (only logged user)
 */
// module.exports.reportWorkshopOwnerCtrl = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { text } = req.body;
//   const workshopOwner = await WorkshopOwner.findById(id);
//   if (!workshopOwner) {
//     return res.status(404).json({ message: "هذا المستخدم غير موجود" });
//   }

//   await WorkshopOwner.findByIdAndUpdate(id, {
//     reports: { $push: { user: req.user.id, text } },
//   });
//   res.status(200).json({ workshop: workshopOwner, message: "تم ارسال بلاغك" });
// });

/**
 * @desc get workshops count
 * @route /api/workshop-owner/count
 * @method GET
 * @access public
 */
module.exports.getWorkshopsCountCtrl = asyncHandler(async (req, res) => {
  const count = await WorkshopOwner.count();
  res.status(200).json(count);
});

/**
 * @desc update workshop
 * @route /api/workshop-owner/:id
 * @method PUT
 * @access private(only user itself)
 */
module.exports.updateWorkshopCtrl = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const workshopOwnerExist = await WorkshopOwner.findById(id);
    if (!workshopOwnerExist)
      return res
        .status(404)
        .json({ message: "هذه الورشة غير موجودة، أو ربما تم حذفها" });
    const updatedWorkshop = await WorkshopOwner.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ data: updatedWorkshop, message: "تم تحديث بيانات الورشة بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

/**
 * @desc update workshop photo
 * @route /api/workshop-owner/:id/photo
 * @method POST
 * @access private(only user itself)
 */
module.exports.uploadWorkshopPhotoCtrl = asyncHandler(async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "يرجي ارفاق الصورة" });
    // get the path to the image
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    // upload to cloudinary
    const result = await cloudinaryImageUpload(imagePath);

    // get the user from DB
    const workshopOwner = await WorkshopOwner.findById(req.user.id);

    // delete the old profile photo if exist
    if (workshopOwner.workshopPhoto.publicId !== null) {
      await cloudinaryRemoveImage(workshopOwner.workshopPhoto.publicId);
    }

    // change the profilePhoto if exist
    workshopOwner.workshopPhoto = {
      url: result.secure_url,
      publicId: result.public_id,
    };
    await workshopOwner.save();

    // send response to client
    res.status(201).json({
      message: "تم تحميل الصورة بنجاح",
      workshopPhoto: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });

    // remove image from the server (images folder)
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});
