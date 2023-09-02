const router = require("express").Router();
const {
  registerUserCtrl,
  loginUserCtrl,
  registerMechanicCtrl,
  loginMechanicCtrl,
} = require("../controllers/authController");

// /api/auth/register
router.post("/register", registerUserCtrl);

// /api/auth/login
router.post("/login", loginUserCtrl);

// /api/auth/mechanic/register
router.post("/mechanic/register", registerMechanicCtrl);

// /api/auth/mechanic/login
router.post("/mechanic/login", loginMechanicCtrl);

module.exports = router;
