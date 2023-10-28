const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// verify token
function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedPayload;
      next();
    } catch (err) {
      return res.status(401).json({ message: "دخول غير مسموح1" });
    }
  } else {
    return res.status(401).json({ message: "2دخول غير مسموح" });
  }
}

// verify token and only user himself
function verifyTokenAndOnlyUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res.status(403).json({ message: "غير مسموح" });
    }
  });
}

function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "دخول غير مسموح" });
    }
  });
}

function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "دخول غير مسموح" });
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndOnlyUser,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
};
