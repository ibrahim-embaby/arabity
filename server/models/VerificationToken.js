const mongoose = require("mongoose");

const VerificationTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    operationType: {
      type: String,
      enum: ["RESET_PASS", "VERIFY_ACC"],
      required: true
    }
  },
  { timestamps: true }
);

// Verification Token Model
const VerificationToken = mongoose.model(
  "VerificationToken",
  VerificationTokenSchema
);

module.exports = VerificationToken;
