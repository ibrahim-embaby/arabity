const router = require("express").Router();
const {
  registerUserCtrl,
  loginUserCtrl,
  registerMechanicCtrl,
  loginMechanicCtrl,
  sendVerificationMailCtrl,
  verifyEmailCtrl,
  resetPasswordCtrl,
  forgotPasswordCtrl,
  refreshTokenCtrl,
  signoutCtrl,
  createOtpCtrl,
  verifyOtpCtrl,
  getCurrentUser,
} = require("../controllers/authController");

// /api/auth/register
router.post("/register", registerUserCtrl);

// /api/auth/login
router.post("/login", loginUserCtrl);

// /api/auth/mechanic/register
router.post("/mechanic/register", registerMechanicCtrl);

// /api/auth/mechanic/login
router.post("/mechanic/login", loginMechanicCtrl);

// /api/auth/send-verification-mail
router.post("/send-verification-mail", sendVerificationMailCtrl);

// /api/auth/verify-email
router.post("/verify-email", verifyEmailCtrl);

// /api/auth/forgot-password
router.post("/forgot-password", forgotPasswordCtrl);

// /api/auth/reset-password
router.post("/reset-password", resetPasswordCtrl);

// /api/auth/refresh-token
router.get("/refresh-token", refreshTokenCtrl);

// /api/auth/signout
router.get("/signout", signoutCtrl);

// /api/auth/otp
router.post("/otp", createOtpCtrl);

// /api/auth/verify-otp
router.post("/verify-otp", verifyOtpCtrl);

// /api/auth/me
router.get("/me", getCurrentUser);

module.exports = router;
