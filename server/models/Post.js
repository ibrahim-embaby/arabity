const mongoose = require("mongoose");
const Joi = require("joi");

const PostSchema = new mongoose.Schema(
  {
    doc: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "docModel",
    },
    docModel: {
      type: String,
      required: [true, "post docModel is required"],
      enum: ["Mechanic", "User"],
    },
    text: {
      type: String,
      min: 3,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    privacy: {
      type: String,
      enum: ["restricted", "public"],
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

PostSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "postId",
  localField: "_id",
});

function validateCreatePost(object) {
  const schema = Joi.object({
    text: Joi.string().required(),
    privacy: Joi.string().lowercase().valid("restricted", "public").required(),
  });

  return schema.validate(object);
}

const Post = mongoose.model("Post", PostSchema);

module.exports = {
  Post,
  validateCreatePost,
};
