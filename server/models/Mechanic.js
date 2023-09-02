const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
    cars: {
      type: Array,
    },

    workshopPhoto: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    workshopBranches: {
      type: Array,
    },
    workshopDescription: {
      type: String,
    },
    workshopServices: {
      type: Array,
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

// generate auth token
MechanicSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
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
          branchProvince: Joi.string().min(1).required(),
          branchCity: Joi.string().min(1).required(),
          branchAddress: Joi.string().min(1).required(),
          branchMobile: Joi.string().min(1).required(),
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
        branchProvince: Joi.string().min(1).required(),
        branchCity: Joi.string().min(1).required(),
        branchAddress: Joi.string().min(1).required(),
        branchMobile: Joi.string().min(1).required(),
      })
    ),
    workshopServices: Joi.array(),
    cars: Joi.array(),
    workshopDescription: Joi.string(),
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
