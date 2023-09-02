const {
  createMechanicPostCtrl,
} = require("../controllers/mechanicPostController");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

// api/mechanic-posts/
router.route("/").post(verifyToken, createMechanicPostCtrl);

module.exports = router;
