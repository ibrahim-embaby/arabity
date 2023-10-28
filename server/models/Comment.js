const mongoose = require("mongoose");
const Joi = require("joi");

const CommentSchema = new mongoose.Schema({
  doc: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "docModel",
    required: true,
  },
  docModel: {
    type: String,
    enum: ["User", "Mechanic"],
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  text: {
    type: String,
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

const Comment = mongoose.model("Comment", CommentSchema);

function validateCreateComment(obj) {
  const schema = Joi.object({
    text: Joi.string().trim().required(),
    doc: Joi.string().id().required(),
    docModel: Joi.string().trim().valid("User", "Mechanic").required(),
    postId: Joi.string().id().required(),
  });

  return schema.validate(obj);
}

module.exports = {
  Comment,
  validateCreateComment,
};
