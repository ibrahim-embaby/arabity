const {
  deleteWorkshopOwnerCtrl,
  getWorkshopOwnerCtrl,
} = require("../controllers/workshopController");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

const router = require("express").Router();

// /api/workshop-owner/:id
router
  .route("/:id")
  .delete(
    validateObjectId,
    verifyTokenAndAuthorization,
    deleteWorkshopOwnerCtrl
  )
  .get(validateObjectId, getWorkshopOwnerCtrl);

module.exports = router;
