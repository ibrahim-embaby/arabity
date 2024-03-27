const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      regex:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mechanic",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://arabity.s3.eu-north-1.amazonaws.com/65c7278572dc95b3ed6b40c0/d231a030-ec3a-11ee-8990-d3828d412366.jpeg",
        key: "65c7278572dc95b3ed6b40c0/d231a030-ec3a-11ee-8990-d3828d412366.jpeg",
      },
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

UserSchema.methods.getSignedToken = function () {
  const accessToken = jwt.sign(
    { id: this._id, isAdmin: this.isAdmin, userType: "User" },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1min",
    }
  );
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "60d",
    }
  );
  return { accessToken, refreshToken };
};

UserSchema.methods.getToken = function (secret) {
  const randomstring = crypto.randomBytes(20).toString("hex");
  const token = jwt.sign(
    {
      randomstring,
      id: this._id,
    },
    secret,
    {
      expiresIn: "30m",
    }
  );

  return token;
};

const User = mongoose.model("User", UserSchema);

// validate registered user
function validateRegisterUser(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(1).required(),
    email: Joi.string()
      .trim()
      .required()
      .email()
      .regex(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    password: Joi.string().trim().min(8).required(),
    mobile: Joi.string().trim().min(11).max(14).required(),
  });
  return schema.validate(obj);
}

// validate login user
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}

module.exports = { User, validateRegisterUser, validateLoginUser };
