const {
  deleteWorkshopOwnerCtrl,
  getWorkshopOwnerCtrl,
  reportWorkshopOwnerCtrl,
  getWorkshopsCountCtrl,
} = require("../controllers/workshopController");
const validateObjectId = require("../middlewares/validateObjectId");
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

// /api/workshop-owner/count
router.route("/count").get(getWorkshopsCountCtrl);

// /api/workshop-owner/:id
router
  .route("/:id")
  .delete(
    validateObjectId,
    verifyTokenAndAuthorization,
    deleteWorkshopOwnerCtrl
  )
  .get(validateObjectId, getWorkshopOwnerCtrl)
  .put(validateObjectId, verifyToken, reportWorkshopOwnerCtrl);

module.exports = router;
