const {
  getUserCtrl,
  getUsersCtrl,
  deleteUserCtrl,
} = require("../controllers/userController");
const validateObjectId = require("../middlewares/validateObjectId");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

// /api/user/
router.get("/", verifyTokenAndAdmin, getUsersCtrl);

// /api/user/profile/:id
router
  .route("/profile/:id")
  .get(validateObjectId, verifyToken, getUserCtrl)
  .delete(validateObjectId, verifyTokenAndAdmin, deleteUserCtrl);

module.exports = router;
