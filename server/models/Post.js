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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
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
  },
  { timestamps: true }
);

function validateCreatePost(object) {
  const schema = Joi.object({
    text: Joi.string().required(),
  });

  return schema.validate(object);
}

const Post = mongoose.model("Post", PostSchema);

module.exports = {
  Post,
  validateCreatePost,
};
