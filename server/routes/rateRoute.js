const router = require("express").Router();
const { rateWorkshopCtrl } = require("../controllers/ratingsController");
const { verifyToken } = require("../middlewares/verifyToken");

// api/rate
router.route("/").post(verifyToken, rateWorkshopCtrl);

module.exports = router;
