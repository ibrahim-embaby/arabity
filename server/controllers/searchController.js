const asyncHandler = require("express-async-handler");
const { WorkshopOwner } = require("../models/WorkshopOwner");
const { WorkshopRatings } = require("../models/WorkshopRatings");
/**
 * @desc get all workshops
 * @route /api/search/workshop
 * @method GET
 * @access public
 */

// Allow full text search
WorkshopOwner.schema.index({ name: "text", description: "text" });

module.exports.getAllWorkshopsCtrl = asyncHandler(async (req, res) => {
  const { province, car, service, page } = req.query;
  const pageSize = 10;

  const currentPage = parseInt(page, 10) || 1;

  let workshops;
  let count;
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
      .populate("workshopRatings", "", WorkshopRatings)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);
    count = (
      await WorkshopOwner.find({
        workshopBranches: {
          $elemMatch: {
            branchProvince: province,
          },
        },
        cars: { $in: car },
        workshopServices: { $in: service },
      })
    ).length;
    return res.status(200).json({ workshops, count });
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
      .populate("workshopRatings", "", WorkshopRatings)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);
    count = (
      await WorkshopOwner.find({
        workshopBranches: {
          $elemMatch: {
            branchProvince: province,
          },
        },
        cars: { $in: car },
      })
    ).length;
    return res.status(200).json({ workshops, count });
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
      .populate("workshopRatings", "", WorkshopRatings)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);
    count = (
      await WorkshopOwner.find({
        workshopBranches: {
          $elemMatch: {
            branchProvince: province,
          },
        },
        workshopServices: { $in: service },
      })
    ).length;
    return res.status(200).json({ workshops, count });
  }

  if (service && car) {
    workshops = await WorkshopOwner.find({
      cars: { $in: car },
      workshopServices: { $in: service },
    })
      .select("-password")
      .populate("workshopRatings", "", WorkshopRatings)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    count = (
      await WorkshopOwner.find({
        cars: { $in: car },
        workshopServices: { $in: service },
      })
    ).length;
    return res.status(200).json({ workshops, count });
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
      .populate("workshopRatings", "", WorkshopRatings)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    count = (
      await WorkshopOwner.find({
        workshopBranches: {
          $elemMatch: {
            branchProvince: province,
          },
        },
      })
    ).length;
    return res.status(200).json({ workshops, count });
  }

  if (car) {
    workshops = await WorkshopOwner.find({ cars: { $in: car } })
      .select("-password")
      .populate("workshopRatings", "", WorkshopRatings)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    count = (await WorkshopOwner.find({ cars: { $in: car } })).length;
    return res.status(200).json({ workshops, count });
  }

  if (service) {
    workshops = await WorkshopOwner.find({ workshopServices: { $in: service } })
      .select("-password")
      .populate("workshopRatings", "", WorkshopRatings)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    count = (await WorkshopOwner.find({ workshopServices: { $in: service } }))
      .length;
    return res.status(200).json({ workshops, count });
  }
  workshops = await WorkshopOwner.find()
    .select("-password")
    .populate("workshopRatings", "", WorkshopRatings)
    .sort({ workshopRatings: -1 })
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize);

  count = (await WorkshopOwner.find()).length;
  res.status(200).json({ workshops, count });
});
