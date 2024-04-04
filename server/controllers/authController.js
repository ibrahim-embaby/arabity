const asyncHandler = require("express-async-handler");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");
const bcrypt = require("bcrypt");

const {
  Mechanic,
  validateCreateMechanic,
  validateLoginMechanic,
} = require("../models/Mechanic");
const VerificationToken = require("../models/VerificationToken");
const ErrorResponse = require("../utils/ErrorResponse");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

/**
 * @desc register user
 * @route /api/auth/register
 * @method POST
 * @access public
 */
module.exports.registerUserCtrl = asyncHandler(async (req, res, next) => {
  try {
    const { error } = validateRegisterUser(req.body);
    if (error) {
      return next(new ErrorResponse(error.details[0].message, 400));
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new ErrorResponse(req.t("account_exist"), 500));
    }

    user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile,
    });

    // creating new verifiaction token and save it to db
    const emailToken = user.getToken(process.env.ACTIVATION_SECRET_KEY);
    const verifiactionToken = await VerificationToken.create({
      userId: user._id,
      token: emailToken,
      operationType: "VERIFY_ACC",
    });

    // making the frontend link
    const link = `${process.env.CLIENT_URL}/account/activate/user/${verifiactionToken.token}`;

    // sending verification mail
    await sendEmail(
      user.email,
      link,
      user.username,
      "Verify Your Account ",
      "varificationmail"
    );

    res.status(201).json({
      success: true,
      message: `We've sent you an email at ${user.email}`,
    });
  } catch (error) {
    if (error.code === 11000)
      return next(new ErrorResponse("duplicate phone number", 400));
    next(error);
  }
});

/**
 * @desc login user
 * @route /api/auth/login
 * @method POST
 * @access public
 */
module.exports.loginUserCtrl = asyncHandler(async (req, res, next) => {
  try {
    const { error } = validateLoginUser(req.body);
    if (error) {
      return next(new ErrorResponse(error.details[0].message, 400));
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorResponse(req.t("incorrect_login_data"), 404));
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return next(new ErrorResponse(req.t("incorrect_login_data"), 400));
    }

    const { accessToken, refreshToken } = user.getSignedToken();

    // send refreshtoken to client in cookie
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 24 * 60 * 60 * 1000,
      expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    });

    // send accesstoken to client
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      isAccountVerified: user.isAccountVerified,
      isAdmin: user.isAdmin,
      token: accessToken,
      profilePhoto: user.profilePhoto,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc register workshop owner
 * @route /api/auth/mechanic/register
 * @method POST
 * @access public
 */
module.exports.registerMechanicCtrl = asyncHandler(async (req, res, next) => {
  try {
    const { error } = validateCreateMechanic(req.body);
    if (error) {
      return next(new ErrorResponse(error.details[0].message, 400));
    }

    let mechanic = await Mechanic.findOne({ email: req.body.email });
    if (mechanic) {
      return next(new ErrorResponse(req.t("account_exist"), 400));
    }

    mechanic = await Mechanic.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      workshopName: req.body.workshopName,
      workshopBranches: req.body.workshopBranches,
      workshopServices: req.body.workshopServices,
      cars: req.body.cars,
    });

    // creating new verifiaction token and save it to db
    const emailToken = mechanic.getToken(process.env.ACTIVATION_SECRET_KEY);
    const verifiactionToken = await VerificationToken.create({
      userId: mechanic._id,
      token: emailToken,
      operationType: "VERIFY_ACC",
    });

    // making the frontend link
    const link = `${process.env.CLIENT_URL}/account/activate/mechanic/${verifiactionToken.token}`;

    // sending verification mail
    await sendEmail(
      mechanic.email,
      link,
      mechanic.workshopName,
      "Verify Your Account ",
      "varificationmail"
    );

    res.status(201).json({
      success: true,
      message: `We've sent you an email at ${mechanic.email}`,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc login workshop owner
 * @route /api/auth/mechanic/login
 * @method POST
 * @access public
 */
module.exports.loginMechanicCtrl = asyncHandler(async (req, res, next) => {
  try {
    const { error } = validateLoginMechanic(req.body);
    if (error) {
      return next(new ErrorResponse(error.details[0].message, 400));
    }

    const mechanic = await Mechanic.findOne({ email: req.body.email });
    if (!mechanic) {
      return next(new ErrorResponse(req.t("incorrect_login_data"), 404));
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      mechanic.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ message: req.t("incorrect_login_data") });
    }

    const { accessToken, refreshToken } = mechanic.getSignedToken();

    // send refreshtoken to client in cookie
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 24 * 60 * 60 * 1000,
      expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    });

    // send accesstoken to client
    res.status(200).json({
      id: mechanic._id,
      username: mechanic.username,
      email: mechanic.email,
      isAccountVerified: mechanic.isAccountVerified,
      token: accessToken,
      workshopName: mechanic.workshopName,
      profilePhoto: mechanic.profilePhoto,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc Refresh token
 * @route /api/auth/refresh-token
 * @method GET
 * @access public
 */
module.exports.refreshTokenCtrl = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.refreshtoken)
    return next(new ErrorResponse("Unauthorized", 403));
  const refreshToken = cookies.refreshtoken;

  // verify the refresh token
  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return next(new ErrorResponse(req.t("session_expired"), 403));

        const foundUser =
          (await User.findById(decoded.id)) ||
          (await Mechanic.findById(decoded.id));
        if (!foundUser)
          return next(new ErrorResponse(req.t("user_not_found"), 404));

        const { accessToken, refreshToken } = foundUser.getSignedToken();

        res.cookie("refreshtoken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 60 * 24 * 60 * 60 * 1000,
          expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        });

        res.status(200).json({ success: true, token: accessToken });
      }
    );
  } catch (error) {
    next(error);
  }
});

/**
 * @desc send verification email
 * @route /api/auth/send-verification-mail
 * @method post
 * @access public
 */
module.exports.sendVerificationMailCtrl = asyncHandler(
  async (req, res, next) => {
    const { email, userType } = req.body;
    if (!email) {
      return next(new ErrorResponse("email is required", 400));
    }
    try {
      const user =
        userType === "user"
          ? await User.findOne({ email })
          : await Mechanic.findOne({ email });
      if (!user) {
        return next(new ErrorResponse(req.t("user_not_found"), 404));
      }

      if (user.isAccountVerified) {
        return res.status(200).json({
          success: true,
          message: req.t("account_already_verified"),
        });
      }

      const emailToken = user.getToken(process.env.ACTIVATION_SECRET_KEY);
      const verifiactionToken = await VerificationToken.create({
        userId: user._id,
        token: emailToken,
        operationType: "VERIFY_ACC",
      });

      // making the frontend link
      const link = `${process.env.CLIENT_URL}/account/activate/${userType}/${verifiactionToken.token}`;
      // sending  verification mail
      await sendEmail(
        user.email,
        link,
        user.workshopName ? user.workshopName : user.username,
        "Verify Your Account ",
        "varificationmail"
      );
      res.status(200).json({
        success: true,
        message: `We've sent you an email at ${email}`,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @desc Verify User Account
 * @route /api/auth/verify-email
 * @method GET
 * @access public
 */
module.exports.verifyEmailCtrl = asyncHandler(async (req, res, next) => {
  try {
    jwt.verify(
      req.body.token,
      process.env.ACTIVATION_SECRET_KEY,
      async (err, decode) => {
        if (err) {
          next(new ErrorResponse(req.t("invalid_verification_token"), 401));
        } else {
          const verificationToken = await VerificationToken.findOne({
            userId: decode.id,
            token: req.body.token,
            operationType: "VERIFY_ACC",
          });
          const user =
            req.body.userType === "user"
              ? await User.findById(decode.id)
              : await Mechanic.findById(decode.id);
          if (verificationToken && !user?.isAccountVerified) {
            user.isAccountVerified = true;
            await user.save();
            await VerificationToken.deleteMany({
              userId: user._id,
              operationType: "VERIFY_ACC",
            });

            res.status(200).json({
              success: true,
              message: req.t("account_verified"),
              data: {
                id: user._id,
                username: user.username,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                isAdmin: user.isAdmin,
                workshopName: user.workshopName,
                profilePhoto: user.profilePhoto,
              },
            });
          } else if (user?.isAccountVerified) {
            return next(
              new ErrorResponse(req.t("account_already_verified"), 400)
            );
          } else if (!verificationToken) {
            return next(
              new ErrorResponse(req.t("invalid_verification_token"), 404)
            );
          }
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

/**
 * @desc Signout User
 * @route /api/auth/signout
 * @method GET
 * @access private (only logged user)
 */
module.exports.signoutCtrl = asyncHandler(async (req, res, next) => {
  res.clearCookie("refreshtoken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({
    success: true,
    message: "Signout Successfully",
  });
});

/**
 * @desc otp login
 * @route /api/auth/otp
 * @method POST
 * @access public
 */
module.exports.createOtpCtrl = asyncHandler(async (req, res, next) => {
  try {
    createTwilioOtp(req.body, (error, results) => {
      if (error) return next(new ErrorResponse(`${error}`, 400));

      return res.status(200).json({
        success: true,
        message: "otp created successfully",
        data: results,
      });
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc verify otp
 * @route /api/auth/verify-otp
 * @method POST
 * @access public
 */
module.exports.verifyOtpCtrl = asyncHandler(async (req, res, next) => {
  try {
    verifyTwilioOtp(req.body, async (error, results) => {
      if (error) {
        return next(new ErrorResponse(`${error}`, 400));
      }
      const user = await User.findOne({ phone: req.body.phone });
      if (!user.isPhoneVerified) {
        user.isPhoneVerified = true;
        await user.save();
        return res.status(200).json({
          success: true,
          message: "otp verified successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "phone number is verified already",
        });
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc send reset password link
 * @route /api/auth/forgot-password
 * @method POST
 * @access public
 */
module.exports.forgotPasswordCtrl = asyncHandler(async (req, res, next) => {
  const { email, userType } = req.body;
  if (!email) {
    return next(new ErrorResponse("email is required", 400));
  }
  try {
    // get the user from db by email
    const user =
      userType === "user"
        ? await User.findOne({ email })
        : await Mechanic.findOne({ email });
    if (!user) {
      return next(new ErrorResponse(req.t("user_not_found"), 404));
    }
    // creating verification token
    const resetPasswordToken = user.getToken(
      process.env.RESET_PASSWORD_SECRET_KEY
    );
    const verifiactionToken = await VerificationToken.create({
      userId: user._id,
      token: resetPasswordToken,
      operationType: "RESET_PASS",
    });

    // create reset password frontend link
    const link = `${process.env.CLIENT_URL}/reset-password/${verifiactionToken.token}`;
    // creating html template
    await sendEmail(
      user.email,
      link,
      user.workshopName ? user.workshopName : user.username,
      "Reset Password",
      "forgotpasswordmail"
    );
    // response to the client
    res.status(200).json({
      success: true,
      message:
        "password reset link sent to your email, please check your inbox",
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc reset password
 * @route /api/auth/reset-password
 * @method POST
 * @access public
 */
module.exports.resetPasswordCtrl = asyncHandler(async (req, res, next) => {
  try {
    jwt.verify(
      req.body.token,
      process.env.RESET_PASSWORD_SECRET_KEY,
      async (err, decode) => {
        if (err) {
          next(new ErrorResponse("Invalid Token", 401));
        } else {
          const verificationToken = await VerificationToken.findOne({
            userId: decode.id,
            token: req.body.token,
          });
          if (verificationToken) {
            const { password } = req.body;
            if (password) {
              if (password.length < 8)
                return next(
                  new ErrorResponse(
                    "password can't be less than 8 characters",
                    400
                  )
                );
              const user =
                (await User.findById(decode.id)) ||
                (await Mechanic.findById(decode.id));
              user.password = password;
              user.markModified("password");
              await user.save();
              await VerificationToken.deleteMany({
                userId: decode.id,
                operationType: "RESET_PASS",
              });
              res.status(200).json({
                success: true,
                message: "password reseted successfully, please login",
              });
            } else {
              next(new ErrorResponse("please provide a password", 400));
            }
          } else {
            next(new ErrorResponse("invalid token, please try again", 404));
          }
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

/**
 * @desc get current user
 * @route /api/auth/me
 * @method GET
 * @access private (only user him self)
 */
module.exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  try {
    const user =
      (await User.findById(req.user.id)) ||
      (await Mechanic.findById(req.user.id));
    if (!user) {
      return res.status(404).json({
        message: "user not found, try to create a new account",
      });
    }

    // send accesstoken to client
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      isAccountVerified: user.isAccountVerified,
      isAdmin: user.isAdmin,
      profilePhoto: user.profilePhoto,
    });
  } catch (error) {
    next(error);
  }
});
