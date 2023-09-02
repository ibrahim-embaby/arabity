const asyncHandler = require("express-async-handler");
const { validateCreateProvince, Province } = require("../models/Province");

/* ============= PROVINCE CONTROLLERS ============= */
/**
 * @desc create province
 * @route /api/controls/province
 * @method POST
 * @access private (admin only)
 */
module.exports.addProvinceCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateCreateProvince(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }

    const { name, code, cities } = req.body;
    const newProvince = new Province({
      name,
      code,
      cities,
    });
    await newProvince.save();

    res.status(201).json({ data: newProvince, message: "تمت الإضافة" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/* ============= CAR CONTROLLERS ============= */

/* ============= SERVICE CONTROLLERS ============= */

/* PROTOTYPE */
/**
 * @desc
 * @route
 * @method
 * @access
 */

// module.exports.addProvinceCtrl = asyncHandler( async(req, res) => {
//     try {

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error: "خطأ في السيرفر"})
//     }
// })
