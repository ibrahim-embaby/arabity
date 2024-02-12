const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const MechanicSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
    workshopName: {
      type: String,
      required: true,
      trim: true,
    },
    cars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    ],
    profilePhoto: {
      type: Object,
      default: {
        url: "https://res.cloudinary.com/dotcfrg0k/image/upload/v1706237423/h70y8aiuzfqyrzrzlyth.webp",
        publicId: "h70y8aiuzfqyrzrzlyth",
      },
    },
    workshopBranches: [
      {
        province: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Province",
        },
        city: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "City",
        },
        address: String,
        mobile: String,
      },
    ],
    workshopDescription: {
      type: String,
    },
    workshopServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    isAccountVerified: {
      type: Boolean,
      default: false
    },
    // reports: [
    //   {
    //     user: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User",
    //     },
    //     text: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
    views: {
      type: Array,
    },
    // socialMedia: [
    //   {
    //     type: String,
    //     default: { url: "" },
    //   },
    // ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// populate ratings
MechanicSchema.virtual("mechanicRatings", {
  ref: "MechanicRating",
  foreignField: "mechanic",
  localField: "_id",
});

MechanicSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

MechanicSchema.methods.getSignedToken = function () {
  const accessToken = jwt.sign(
    { id: this._id, userType: "Mechanic" },
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

MechanicSchema.methods.getActivationToken = async function () {
  const randomstring = crypto.randomBytes(20).toString("hex");
  const resetPasswordToken = jwt.sign(
    {
      randomstring,
      id: this._id,
      email: this.email,
    },
    process.env.ACTIVATION_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  return resetPasswordToken;
};

function validateCreateMechanic(obj) {
  const schema = Joi.object({
    username: Joi.string().min(1).required(),
    email: Joi.string().min(1).required().email(),
    password: Joi.string().min(1).required(),
    workshopName: Joi.string().min(1).required(),
    workshopBranches: Joi.array()
      .items(
        Joi.object({
          province: Joi.string().id().required(),
          city: Joi.string().id().required(),
          address: Joi.string().min(3).required(),
          mobile: Joi.string().min(1).required(),
        })
      )
      .required(),
    workshopServices: Joi.array().required(),
    cars: Joi.array().required(),
  });
  return schema.validate(obj);
}

function validateUpdateMechanic(obj) {
  const schema = Joi.object({
    username: Joi.string().min(1),
    password: Joi.string().min(1),
    workshopName: Joi.string().min(1),
    workshopBranches: Joi.array().items(
      Joi.object({
        province: Joi.string().id().required(),
        city: Joi.string().id().required(),
        address: Joi.string().min(1).required(),
        mobile: Joi.string().min(1).required(),
      })
    ),
    workshopServices: Joi.array(),
    cars: Joi.array(),
    workshopDescription: Joi.string().allow(""),
  });
  return schema.validate(obj);
}

function validateLoginMechanic(obj) {
  const schema = Joi.object({
    email: Joi.string().min(1).required().email(),
    password: Joi.string().min(1).required(),
  });
  return schema.validate(obj);
}

const Mechanic = mongoose.model("Mechanic", MechanicSchema);

module.exports = {
  Mechanic,
  validateCreateMechanic,
  validateLoginMechanic,
  validateUpdateMechanic,
};
