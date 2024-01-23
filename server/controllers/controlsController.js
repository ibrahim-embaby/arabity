const asyncHandler = require("express-async-handler");
const { validateCreateProvince, Province } = require("../models/Province");
const { Car, validateCar } = require("../models/Car");
const { Service, validateService } = require("../models/Service");
const { validateCreateCity, City } = require("../models/City");

/* ============= PROVINCE CONTROLLERS ============= */
/**
 * @desc create province
 * @route /api/controls/provinces
 * @method POST
 * @access private (admin only)
 */
module.exports.addProvinceCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateCreateProvince(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newProvince = await Province.create(req.body);

    res.status(201).json({ data: newProvince, message: "تمت الإضافة" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc get provinces
 * @route /api/controls/provinces
 * @method GET
 * @access public
 */
module.exports.getProvincesCtrl = asyncHandler(async (req, res) => {
  try {
    const provinces = await Province.find().populate({
      path: "cities",
      select: "label value _id -province",
    });
    res.status(200).json(provinces);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc get single province
 * @route /api/controls/provinces/:id
 * @method GET
 * @access public
 */
module.exports.getSingleProvinceCtrl = asyncHandler(async (req, res) => {
  try {
    const province = await Province.findById(req.params.id).populate("cities");
    res.status(200).json(province);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc create city
 * @route /api/controls/cities
 * @method POST
 * @access private (admin only)
 */
module.exports.addCityCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateCreateCity(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newCity = await City.create(req.body);

    res.status(201).json({ data: newCity, message: "تمت الإضافة" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/* ============= CAR CONTROLLERS ============= */
/**
 * @desc add new car
 * @route /api/controls/cars
 * @method POST
 * @access private (only admin)
 */
module.exports.addCarCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateCar(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const newCar = await Car.create(req.body);
    res.status(201).json({ data: newCar, message: "تمت الإضافة" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc get cars
 * @route /api/controls/cars
 * @method GET
 * @access public
 */
module.exports.getCarsCtrl = asyncHandler(async (req, res) => {
  try {
    const cars = await Car.find();

    res.status(200).json(cars);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});
/* ============= SERVICE CONTROLLERS ============= */
/**
 * @desc add new car
 * @route /api/controls/cars
 * @method POST
 * @access private (only admin)
 */
module.exports.addServiceCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateService(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const newService = await Service.create(req.body);
    res.status(201).json({ data: newService, message: "تمت الإضافة" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc get services
 * @route /api/controls/services
 * @method GET
 * @access public
 */
module.exports.getServicesCtrl = asyncHandler(async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

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
//         res.status(500).json({ message: req.t("server_error") });
//     }
// })
