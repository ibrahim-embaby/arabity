const router = require("express").Router();
const {
  registerUserCtrl,
  loginUserCtrl,
  loginWorkshopOwnerCtrl,
  registerWorkshopOwnerCtrl,
} = require("../controllers/authController");

// /api/auth/register
router.post("/register", registerUserCtrl);

// /api/auth/login
router.post("/login", loginUserCtrl);

// /api/auth/workshop-owner/register
router.post("/workshop-owner/register", registerWorkshopOwnerCtrl);

// /api/auth/workshop-owner/login
router.post("/workshop-owner/login", loginWorkshopOwnerCtrl);

module.exports = router;
