const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
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

const Service = mongoose.model("Service", ServiceSchema);

module.exports = {
  Service,
  validateService,
};
