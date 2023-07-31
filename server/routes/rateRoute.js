const router = require("express").Router();
const {
  rateWorkshopCtrl,
  deleteRatingCtrl,
  getSingleUserRatings,
  getAllRatings,
} = require("../controllers/ratingsController");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");

// api/ratings
router
  .route("/")
  .post(verifyToken, rateWorkshopCtrl)
  .get(verifyToken, getAllRatings);

// /api/ratings/:id
router.route("/:id").delete(validateObjectId, verifyToken, deleteRatingCtrl);

// /api/ratings/:userId
router.route("/:userId").get(verifyToken, getSingleUserRatings);

module.exports = router;
