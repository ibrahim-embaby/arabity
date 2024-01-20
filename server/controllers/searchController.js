const asyncHandler = require("express-async-handler");
const { Mechanic } = require("../models/Mechanic");
const { MechanicRating } = require("../models/MechanicRating");
/**
 * @desc get all workshops
 * @route /api/search/workshop
 * @method GET
 * @access public
 */

// Allow full text search
Mechanic.schema.index({ name: "text", description: "text" });

module.exports.getAllWorkshopsCtrl = asyncHandler(async (req, res) => {
  const { province, car, service, page } = req.query;
  const pageSize = 10;
  const currentPage = parseInt(page, 10) || 1;

  let workshops;
  let count;
  if (province && car && service) {
    workshops = await Mechanic.find({
      workshopBranches: {
        $elemMatch: {
          province,
        },
      },
      cars: { $in: car },
      workshopServices: { $in: service },
    })
      .select("-password")
      .populate("mechanicRatings", "", MechanicRating)
      .populate("cars")
      .populate("workshopServices")
      .populate({
        path: "workshopBranches",
        populate: {
          path: "province",
          select: "_id label value",
        },
      })
      .populate({
        path: "workshopBranches",
        populate: {
          path: "city",
          select: "_id label value",
        },
      })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);
    count = (
      await Mechanic.find({
        workshopBranches: {
          $elemMatch: {
            province,
          },
        },
        cars: { $in: car },
        workshopServices: { $in: service },
      })
    ).length;
    return res.status(200).json({ workshops, count });
  }
  if (province && car) {
    workshops = await Mechanic.find({
      workshopBranches: {
        $elemMatch: {
          province,
        },
      },
      cars: { $in: car },
    })
      .select("-password")
      .populate("mechanicRatings", "", MechanicRating)
      .populate("cars")
      .populate("workshopServices")
      .populate({
        path: "workshopBranches",
        populate: {
          path: "province",
          select: "_id label value",
        },
      })
      .populate({
        path: "workshopBranches",
        populate: {
          path: "city",
          select: "_id label value",
        },
      })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);
    count = (
      await Mechanic.find({
        workshopBranches: {
          $elemMatch: {
            province,
          },
        },
        cars: { $in: car },
      })
    ).length;
    return res.status(200).json({ workshops, count });
  }

  if (province && service) {
    workshops = await Mechanic.find({
      workshopBranches: {
        $elemMatch: {
          province,
        },
      },
      workshopServices: { $in: service },
    })
      .select("-password")
      .populate("mechanicRatings", "", MechanicRating)
      .populate("cars")
      .populate("workshopServices")
      .populate({
        path: "workshopBranches",
        populate: {
          path: "province",
          select: "_id label value",
        },
      })
      .populate({
        path: "workshopBranches",
        populate: {
          path: "city",
          select: "_id label value",
        },
      })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);
    count = (
      await Mechanic.find({
        workshopBranches: {
          $elemMatch: {
            province,
          },
        },
        workshopServices: { $in: service },
      })
    ).length;
    return res.status(200).json({ workshops, count });
  }

  if (service && car) {
    workshops = await Mechanic.find({
      cars: { $in: car },
      workshopServices: { $in: service },
    })
      .select("-password")
      .populate("mechanicRatings", "", MechanicRating)
      .populate("cars")
      .populate("workshopServices")
      .populate({
        path: "workshopBranches",
        populate: {
          path: "province",
          select: "_id label value",
        },
      })
      .populate({
        path: "workshopBranches",
        populate: {
          path: "city",
          select: "_id label value",
        },
      })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    count = (
      await Mechanic.find({
        cars: { $in: car },
        workshopServices: { $in: service },
      })
    ).length;
    return res.status(200).json({ workshops, count });
  }

  if (province) {
    workshops = await Mechanic.find({
      workshopBranches: {
        $elemMatch: {
          province,
        },
      },
    })
      .select("-password")
      .populate("mechanicRatings", "", MechanicRating)
      .populate("cars")
      .populate("workshopServices")
      .populate({
        path: "workshopBranches",
        populate: {
          path: "province",
          select: "_id label value",
        },
      })
      .populate({
        path: "workshopBranches",
        populate: {
          path: "city",
          select: "_id label value",
        },
      })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);
    count = (
      await Mechanic.find({
        workshopBranches: {
          $elemMatch: {
            province,
          },
        },
      })
    ).length;
    return res.status(200).json({ workshops, count });
  }

  if (car) {
    workshops = await Mechanic.find({ cars: { $in: car } })
      .select("-password")
      .populate("mechanicRatings", "", MechanicRating)
      .populate("cars")
      .populate("workshopServices")
      .populate({
        path: "workshopBranches",
        populate: {
          path: "province",
          select: "_id label value",
        },
      })
      .populate({
        path: "workshopBranches",
        populate: {
          path: "city",
          select: "_id label value",
        },
      })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    count = (await Mechanic.find({ cars: { $in: car } })).length;
    return res.status(200).json({ workshops, count });
  }

  if (service) {
    workshops = await Mechanic.find({ workshopServices: { $in: service } })
      .select("-password")
      .populate("mechanicRatings", "", MechanicRating)
      .populate("cars")
      .populate("workshopServices")
      .populate({
        path: "workshopBranches",
        populate: {
          path: "province",
          select: "_id label value",
        },
      })
      .populate({
        path: "workshopBranches",
        populate: {
          path: "city",
          select: "_id label value",
        },
      })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    count = (await Mechanic.find({ workshopServices: { $in: service } }))
      .length;
    return res.status(200).json({ workshops, count });
  }
  workshops = await Mechanic.find()
    .select("-password")
    .populate("mechanicRatings", "", MechanicRating)
    .populate("cars")
    .populate("workshopServices")
    .populate({
      path: "workshopBranches",
      populate: {
        path: "province",
        select: "_id label value",
      },
    })
    .populate({
      path: "workshopBranches",
      populate: {
        path: "city",
        select: "_id label value",
      },
    })
    .sort({ mechanicRatings: -1 })
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize);

  count = (await Mechanic.find()).length;
  res.status(200).json({ workshops, count });
});
