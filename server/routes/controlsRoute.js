const { addProvinceCtrl } = require("../controllers/controlsController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();

// PROVINCE ROUTES

// /api/controls/province
router.route("/province").post(verifyTokenAndAdmin, addProvinceCtrl);

// CAR ROUTES

// SERVICES ROUTES

module.exports = router;
