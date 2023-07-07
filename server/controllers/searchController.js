const asyncHandler = require("express-async-handler");
const { WorkshopOwner } = require("../models/WorkshopOwner");
const { WorkshopRatings } = require("../models/WorkshopRatings");
/**
 * @desc get all workshops
 * @route /api/search/workshop
 * @method GET
 * @access public
 */

module.exports.getAllWorkshopsCtrl = asyncHandler(async (req, res) => {
  const { province, car, service } = req.query;
  let workshops;
  if (province && car && service) {
    workshops = await WorkshopOwner.find({
      workshopBranches: {
        $elemMatch: {
          branchProvince: province,
        },
      },
      cars: { $in: car },
      workshopServices: { $in: service },
    })
      .select("-password")
      .populate("workshopRatings", "", WorkshopRatings);
    return res.status(200).json(workshops);
  }
  if (province && car) {
    workshops = await WorkshopOwner.find({
      workshopBranches: {
        $elemMatch: {
          branchProvince: province,
        },
      },
      cars: { $in: car },
    })
      .select("-password")
      .populate("workshopRatings", "", WorkshopRatings);
    return res.status(200).json(workshops);
  }

  if (province && service) {
    workshops = await WorkshopOwner.find({
      workshopBranches: {
        $elemMatch: {
          branchProvince: province,
        },
      },
      workshopServices: { $in: service },
    })
      .select("-password")
      .populate("workshopRatings", "", WorkshopRatings);
    return res.status(200).json(workshops);
  }

  if (service && car) {
    workshops = await WorkshopOwner.find({
      cars: { $in: car },
      workshopServices: { $in: service },
    })
      .select("-password")
      .populate("workshopRatings", "", WorkshopRatings);
    return res.status(200).json(workshops);
  }

  if (province) {
    workshops = await WorkshopOwner.find({
      workshopBranches: {
        $elemMatch: {
          branchProvince: province,
        },
      },
    })
      .select("-password")
      .populate("workshopRatings", "", WorkshopRatings);
    return res.status(200).json(workshops);
  }

  if (car) {
    workshops = await WorkshopOwner.find({ cars: { $in: car } })
      .select("-password")
      .populate("workshopRatings", "", WorkshopRatings);
    return res.status(200).json(workshops);
  }

  if (service) {
    workshops = await WorkshopOwner.find({ workshopServices: { $in: service } })
      .select("-password")
      .populate("workshopRatings", "", WorkshopRatings);
    return res.status(200).json(workshops);
  }
  workshops = await WorkshopOwner.find()
    .select("-password")
    .populate("workshopRatings", "", WorkshopRatings);

  res.status(200).json(workshops);
});
