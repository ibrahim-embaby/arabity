const asyncHandler = require("express-async-handler");
const { Mechanic, validateUpdateMechanic } = require("../models/Mechanic");
const { MechanicRating } = require("../models/MechanicRating");
const path = require("path");
const {
  cloudinaryImageUpload,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { Conversation } = require("../models/Conversation");
const Message = require("../models/Message");

/**
 * @desc get workshop owner
 * @route /api/mechanic/:id
 * @method GET
 * @access public
 */
module.exports.getMechanicCtrl = asyncHandler(async (req, res) => {
  const mechanic = await Mechanic.findById(req.params.id)
    .select("-password")
    .populate({
      path: "mechanicRatings",
      populate: {
        path: "user",
        select: "username",
      },
    })
    .populate("cars")
    .populate("workshopServices")
    .populate({
      path: "workshopBranches",
      populate: {
        path: "province",
        populate: {
          path: "cities",
          select: "label value _id -province",
        },
        select: "_id label value",
      },
    })
    .populate({
      path: "workshopBranches",
      populate: {
        path: "city",
        select: "_id label value",
      },
    });

  if (!mechanic) {
    return res.status(404).json({ message: req.t("user_not_found") });
  }
  res.status(200).json(mechanic);
});

/**
 * @desc delete workshop owner
 * @route /api/mechanic/:id
 * @method DELETE
 * @access private (only user himself & admin)
 * TODO: delete mechanic photo
 */
module.exports.deleteMechanicCtrl = asyncHandler(async (req, res) => {
  const mechanic = await Mechanic.findById(req.params.id);
  if (!mechanic) {
    return res.status(404).json({ message: req.t("user_not_found") });
  }
  await Mechanic.deleteOne({ _id: mechanic._id });
  await MechanicRating.deleteMany({ mechanic: mechanic._id });
  await Conversation.deleteMany({ mechanicId: mechanic._id });
  await Message.deleteMany({ $in: { conversationId: mechanic._id } });
  const regex = new RegExp(`${mechanic._id}$`, "i");
  await Message.deleteMany({ conversationId: regex });
  return res.status(200).json({ message: req.t("account_deleted") });
});

// /**
//  * @desc delete many workshop owners
//  * @route /api/mechanic/
//  * @method DELETE
//  * @access private (only admin)
//  */
// module.exports.deleteWorkshopOwnerCtrl = asyncHandler(async (req, res) => {
//   const mechanic = await Mechanic.findById(req.params.id);
//   if (!mechanic) {
//     return res.status(404).json({ message: "هذا المستخدم غير موجود" });
//   }
//   await Mechanic.deleteOne({ _id: mechanic._id });
//   await WorkshopRatings.deleteMany({ mechanic: mechanic._id });
//   return res.status(200).json({ message: "تم حذف الحساب بنجاح" });
// });

/**
 * @desc report workshop owner
 * @route /api/mechanic/:id
 * @method PUT
 * @access private (only logged user)
 */
// module.exports.reportWorkshopOwnerCtrl = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { text } = req.body;
//   const mechanic = await Mechanic.findById(id);
//   if (!mechanic) {
//     return res.status(404).json({ message: "هذا المستخدم غير موجود" });
//   }

//   await Mechanic.findByIdAndUpdate(id, {
//     reports: { $push: { user: req.user.id, text } },
//   });
//   res.status(200).json({ workshop: mechanic, message: "تم ارسال بلاغك" });
// });

/**
 * @desc get workshops count
 * @route /api/mechanic/count
 * @method GET
 * @access public
 */
module.exports.getWorkshopsCountCtrl = asyncHandler(async (req, res) => {
  const count = await Mechanic.count();
  res.status(200).json(count);
});

/**
 * @desc update workshop
 * @route /api/mechanic/:id
 * @method PUT
 * @access private(only user itself)
 */
module.exports.updateMechanicCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateUpdateMechanic(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { id } = req.params;
    const mechanicExist = await Mechanic.findById(id);
    if (!mechanicExist)
      return res.status(404).json({ message: req.t("no_workshop") });

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
    }

    const updatedMechanic = await Mechanic.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .select("-password")
      .populate({
        path: "mechanicRatings",
        populate: {
          path: "user",
          select: "username",
        },
      })
      .populate("cars")
      .populate("workshopServices")
      .populate({
        path: "workshopBranches",
        populate: {
          path: "province",
          populate: {
            path: "cities",
            select: "label value _id -province",
          },
          select: "_id label value",
        },
      })
      .populate({
        path: "workshopBranches",
        populate: {
          path: "city",
          select: "_id label value",
        },
      });
    res
      .status(200)
      .json({ data: updatedMechanic, message: req.t("workshop_updated") });
  } catch (error) {
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc upload workshop photo
 * @route /api/mechanic/:id/photo
 * @method POST
 * @access private(only user itself)
 */
module.exports.uploadMechanicPhotoCtrl = asyncHandler(async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: req.t("attatch_image") });
    // get the path to the image
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    // upload to cloudinary
    const result = await cloudinaryImageUpload(imagePath);

    // get the user from DB
    const mechanic = await Mechanic.findById(req.user.id);

    // delete the old profile photo if exist
    if (mechanic.profilePhoto.publicId !== null) {
      await cloudinaryRemoveImage(mechanic.profilePhoto.publicId);
    }

    // change the profilePhoto if exist
    mechanic.profilePhoto = {
      url: result.secure_url,
      publicId: result.public_id,
    };
    await mechanic.save();

    // send response to client
    res.status(201).json({
      message: req.t("photo_uploaded"),
      profilePhoto: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });

    // remove image from the server (images folder)
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});
