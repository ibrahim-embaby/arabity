const { getUserCtrl } = require("../controllers/userController");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

// /api/user/profile/:id
router.route("/profile/:id").get(validateObjectId, verifyToken, getUserCtrl);

module.exports = router;
