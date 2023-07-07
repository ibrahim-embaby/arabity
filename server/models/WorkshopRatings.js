const Joi = require("joi");
const mongoose = require("mongoose");

const WorkshopRatingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workshopOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkshopOwner",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const WorkshopRatings = mongoose.model(
  "WorkshopRatings",
  WorkshopRatingsSchema
);

function validateCreateRating(obj) {
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    text: Joi.string().trim().min(1).required(),
    workshopOwner: Joi.string().required(),
  });
  return schema.validate(obj);
}

module.exports = {
  WorkshopRatings,
  validateCreateRating,
};
