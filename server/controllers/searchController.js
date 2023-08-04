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
  const pageSize = 5;
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
      .populate("workshopRatings", "", WorkshopRatings);
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
      .populate("workshopRatings", "", WorkshopRatings);
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
      .populate("workshopRatings", "", WorkshopRatings);

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
      .populate("workshopRatings", "", WorkshopRatings);

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
      .populate("workshopRatings", "", WorkshopRatings);

    count = (await WorkshopOwner.find({ cars: { $in: car } })).length;
    return res.status(200).json({ workshops, count });
  }

  if (service) {
    workshops = await WorkshopOwner.find({ workshopServices: { $in: service } })
      .select("-password")
      .populate("workshopRatings", "", WorkshopRatings);

    count = (await WorkshopOwner.find({ workshopServices: { $in: service } }))
      .length;
    return res.status(200).json({ workshops, count });
  }
  workshops = await WorkshopOwner.find()
    .select("-password")
    .populate("workshopRatings", "", WorkshopRatings)
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize);

  count = (await WorkshopOwner.find()).length;
  res.status(200).json({ workshops, count });
});

// module.exports.getAllWorkshopsCtrl = asyncHandler(async (req, res) => {
//   const { province, car, service } = req.query;
//   let workshops;

//   // Add error handling
//   try {
//     if (province && car && service) {
//       workshops = await WorkshopOwner.find({
//         workshopBranches: {
//           $elemMatch: {
//             branchProvince: province,
//           },
//         },
//         cars: { $in: car },
//         workshopServices: { $in: service },
//       })
//         .select("-password")
//         .populate("workshopRatings", "", WorkshopRatings);
//       console.log(workshops);
//     } else if (province && car) {
//       workshops = await WorkshopOwner.find({
//         workshopBranches: {
//           $elemMatch: {
//             branchProvince: province,
//           },
//         },
//         cars: { $in: car },
//       })
//         .select("-password")
//         .populate("workshopRatings", "", WorkshopRatings);
//     } else if (province && service) {
//       workshops = await WorkshopOwner.find({
//         workshopBranches: {
//           $elemMatch: {
//             branchProvince: province,
//           },
//         },
//         workshopServices: { $in: service },
//       })
//         .select("-password")
//         .populate("workshopRatings", "", WorkshopRatings);
//     } else if (service && car) {
//       workshops = await WorkshopOwner.find({
//         cars: { $in: car },
//         workshopServices: { $in: service },
//       })
//         .select("-password")
//         .populate("workshopRatings", "", WorkshopRatings);
//     } else if (province) {
//       workshops = await WorkshopOwner.find({
//         workshopBranches: {
//           $elemMatch: {
//             branchProvince: province,
//           },
//         },
//       })
//         .select("-password")
//         .populate("workshopRatings", "", WorkshopRatings);
//     } else if (car) {
//       workshops = await WorkshopOwner.find({ cars: { $in: car } })
//         .select("-password")
//         .populate("workshopRatings", "", WorkshopRatings);
//     } else if (service) {
//       workshops = await WorkshopOwner.find({
//         workshopServices: { $in: service },
//       })
//         .select("-password")
//         .populate("workshopRatings", "", WorkshopRatings);
//     } else {
//       workshops = await WorkshopOwner.find()
//         .select("-password")
//         .populate("workshopRatings", "", WorkshopRatings);
//     }
//   } catch (err) {
//     res.status(500).json({ error: err });
//     return;
//   }

//   // Add pagination
//   // const pageSize = 10;
//   // const currentPage = parseInt(req.query.page, 10) || 1;

//   // workshops = workshops.skip((currentPage - 1) * pageSize).limit(pageSize);

//   res.status(200).json({ workshops });
// });

//...................................................................................

// module.exports.getAllWorkshopsCtrl = asyncHandler(async (req, res) => {
//   const ITEMS_NUMBER = 2;
//   const { province, car, service, page } = req.query;

//   let query = {};

//   // Allow partial matching for filters
//   if (province) query.province = { $regex: new RegExp(province, "i") };
//   if (car) query.cars = { $in: car };
//   if (service) query.workshopServices = { $in: service };

//   // Full text search
//   if (req.query.q) {
//     query.$text = { $search: req.query.q };
//   }

//   const workshops = await WorkshopOwner.find(query)
//     .populate("workshopRatings", "", WorkshopRatings)
//     // .sort({ $meta: "textScore", "workshopRatings.averageRating": -1 })
//     .skip((page - 1) * 10)
//     .limit(10);
//   res.status(200).json(workshops);
// });

//...................................................................................
// module.exports.getAllWorkshopsCtrl = asyncHandler(async (req, res) => {
//   const { province, car, service, page = 1, limit = 10 } = req.query;

//   const workshops = await WorkshopOwner.find({
//     $or: [
//       { workshopBranches: { $elemMatch: { branchProvince: province } } },
//       { cars: { $in: car } },
//       { workshopServices: { $in: service } },
//     ],
//   })
//     .select("-password")
//     .populate("workshopRatings", "", WorkshopRatings)
//     .skip(limit * (page - 1))
//     .limit(limit);

//   res.status(200).json(workshops);
// });
