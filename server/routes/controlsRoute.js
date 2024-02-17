const {
  addProvinceCtrl,
  addServiceCtrl,
  addCarCtrl,
  getProvincesCtrl,
  getCarsCtrl,
  getServicesCtrl,
  addCityCtrl,
  getSingleProvinceCtrl,
} = require("../controllers/controlsController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();

// PROVINCE ROUTES

// /api/controls/provinces
router
  .route("/provinces")
  .post(verifyTokenAndAdmin, addProvinceCtrl)
  .get(getProvincesCtrl);

// /api/controls/provinces/:id
router.route("/province/:id").get(getSingleProvinceCtrl);

// /api/controls/cities
router.route("/cities").post(verifyTokenAndAdmin, addCityCtrl);

// CAR ROUTES
// /api/controls/cars
router.route("/cars").post(verifyTokenAndAdmin, addCarCtrl).get(getCarsCtrl);

// SERVICES ROUTES
// /api/controls/services
router
  .route("/services")
  .post(verifyTokenAndAdmin, addServiceCtrl)
  .get(getServicesCtrl);

module.exports = router;
