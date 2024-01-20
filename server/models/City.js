const mongoose = require("mongoose");
const Joi = require("joi");

const CitySchema = new mongoose.Schema(
  {
    label: {
      ar: {
        type: String,
        required: true,
        trim: true,
      },
      en: {
        type: String,
        required: true,
        trim: true,
      },
    },
    value: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    province: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

function validateCreateCity(object) {
  const schema = Joi.object({
    value: Joi.string().trim().required(),
    label: Joi.object({
      ar: Joi.string().required(),
      en: Joi.string().required(),
    }).required(),
    province: Joi.string().id().required(),
  });

  return schema.validate(object, {
    errors: {
      messages: {
        required: "This field is required",
        unique: "This value must be unique",
      },
    },
  });
}

const City = mongoose.model("City", CitySchema);

module.exports = {
  City,
  validateCreateCity,
};
