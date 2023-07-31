const {
  deleteWorkshopOwnerCtrl,
  getWorkshopOwnerCtrl,
  reportWorkshopOwnerCtrl,
} = require("../controllers/workshopController");
const validateObjectId = require("../middlewares/validateObjectId");
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

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
