const mongoose = require("mongoose");
const Joi = require("joi");

const ServiceSchema = new mongoose.Schema(
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

function validateService(object) {
  const schema = Joi.object({
    value: Joi.string().trim().required(),
    label: Joi.object({
      ar: Joi.string().required(),
      en: Joi.string().required(),
    }).required(),
    isActive: Joi.boolean(),
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

const Service = mongoose.model("Service", ServiceSchema);

module.exports = {
  Service,
  validateService,
};
