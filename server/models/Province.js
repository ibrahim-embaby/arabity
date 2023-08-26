const mongoose = require("mongoose");
const Joi = require("joi");

const ProvinceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    code: {
      type: String,
      unique: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    cities: [
      {
        name: { type: String, required: true },
        code: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

function validateCreateProvince(object) {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    code: Joi.string().required(),
    cities: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
      })
    ),
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

const Province = mongoose.model("Province", ProvinceSchema);

module.exports = {
  Province,
  validateCreateProvince,
};
