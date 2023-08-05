const mongoose = require("mongoose");
const Joi = require("joi");

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  creatorType: {
    type: String,
    enum: ["User", "WorkshopOwner"],
    required: true,
  },
});

// Virtual populate users and workshop owners
CommentSchema.virtual("creator", {
  ref: (creatorType) => (creatorType === "User" ? "User" : "WorkshopOwner"),
  foreignField: "_id",
  localField: "creatorId",
});

CommentSchema.set("toJSON", {
  virtuals: true,
});

function validateComment(comment) {
  const schema = Joi.object({
    text: Joi.string().required(),
    creatorId: Joi.string().required(),
    creatorType: Joi.string().valid("User", "WorkshopOwner").required(),
  });

  return schema.validate(comment);
}

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {
  Comment,
  validateComment,
};
