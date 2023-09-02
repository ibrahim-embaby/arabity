const {
  getWorkshopsCountCtrl,
  uploadMechanicPhotoCtrl,
  deleteMechanicCtrl,
  getMechanicCtrl,
  updateMechanicCtrl,
  createMechanicPostCtrl,
  getSingleMechanicPostCtrl,
} = require("../controllers/mechanicController");
const photoUpload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndOnlyUser,
  verifyToken,
} = require("../middlewares/verifyToken");
const router = require("express").Router();

/* --------------------------------- FUNCTIONS --------------------------------- */

// /api/mechanic/count
router.route("/count").get(getWorkshopsCountCtrl);

// /api/mechanic/:id/photo
router
  .route("/:id/photo")
  .post(
    validateObjectId,
    verifyTokenAndOnlyUser,
    photoUpload.single("image"),
    uploadMechanicPhotoCtrl
  );

// /api/mechanic/:mechanicId/posts/
router.route("/:mechanicId/posts").post(verifyToken, createMechanicPostCtrl);

// /api/mechanic/:mechanicId/posts/
router.route("/:mechanicId/posts/:postId").get(getSingleMechanicPostCtrl);

// /api/mechanic/:id
router
  .route("/:id")
  .delete(validateObjectId, verifyTokenAndAuthorization, deleteMechanicCtrl)
  .get(validateObjectId, getMechanicCtrl)
  .put(validateObjectId, verifyTokenAndOnlyUser, updateMechanicCtrl);

module.exports = router;
