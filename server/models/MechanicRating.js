const Joi = require("joi");
const mongoose = require("mongoose");

const MechanicRatingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mechanic",
      required: true,
    },
    rating: {
      type: Number,
      min: 0.5,
      max: 5,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MechanicRating = mongoose.model("MechanicRating", MechanicRatingSchema);

function validateCreateRating(obj) {
  const schema = Joi.object({
    rating: Joi.number().min(0.5).max(5).required(),
    text: Joi.string().trim().min(1).required(),
    mechanic: Joi.string().required(),
  });
  return schema.validate(obj);
}

module.exports = {
  MechanicRating,
  validateCreateRating,
};
