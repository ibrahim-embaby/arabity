const mongoose = require("mongoose");
const Joi = require("joi");

const CarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    code: {
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

function validateCar(object) {
  const schema = Joi.object({
    name: Joi.string().required().trim().unique(),
    code: Joi.string().required(),
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

const Car = mongoose.model("Car", CarSchema);

module.exports = {
  Car,
  validateCar,
};
