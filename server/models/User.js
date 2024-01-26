const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
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
        url: "https://res.cloudinary.com/dotcfrg0k/image/upload/v1706238234/oqjxuv7aof6vo4esteyd.jpg",
        publicId: "oqjxuv7aof6vo4esteyd",
      },
    },
  },
  { timestamps: true }
);

// Generate Auth Token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin, userType: "User" },
    process.env.JWT_SECRET,
    {
      expiresIn: "1y",
    }
  );
};

const User = mongoose.model("User", UserSchema);

// validate registered user
function validateRegisterUser(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(1).required(),
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().min(5).required(),
    mobile: Joi.string().trim().min(11).max(14).required(),
  });
  return schema.validate(obj);
}

// validate login user
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().min(5).required(),
  });
  return schema.validate(obj);
}

module.exports = { User, validateRegisterUser, validateLoginUser };
