const {
  deleteWorkshopOwnerCtrl,
  getWorkshopOwnerCtrl,
  getWorkshopsCountCtrl,
  uploadWorkshopPhotoCtrl,
} = require("../controllers/workshopController");
const photoUpload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndOnlyUser,
} = require("../middlewares/verifyToken");
const router = require("express").Router();

/* --------------------------------- FUNCTIONS --------------------------------- */

// /api/workshop-owner/count
router.route("/count").get(getWorkshopsCountCtrl);

// /api/workshop-owner/:id/photo
router
  .route("/:id/photo")
  .post(
    validateObjectId,
    verifyTokenAndOnlyUser,
    photoUpload.single("image"),
    uploadWorkshopPhotoCtrl
  );

// /api/workshop-owner/:id
router
  .route("/:id")
  .delete(
    validateObjectId,
    verifyTokenAndAuthorization,
    deleteWorkshopOwnerCtrl
  )
  .get(validateObjectId, getWorkshopOwnerCtrl)
  .put(validateObjectId, verifyTokenAndOnlyUser, updateWorkshopCtrl);

module.exports = router;
