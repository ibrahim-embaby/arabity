const mongoose = require("mongoose");
const Joi = require("joi");

const MechanicPostSchema = new mongoose.Schema(
  {
    postCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkshopOwnerSchema",
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
    likes: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

function validateCreateMechanicPost(object) {
  const schema = Joi.object({
    text: Joi.string().required(),
  });

  return schema.validate(object);
}

const MechanicPost = mongoose.model("MechanicPost", MechanicPostSchema);

module.exports = {
  MechanicPost,
  validateCreateMechanicPost,
};
