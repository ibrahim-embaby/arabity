const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const MechanicSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    workshopName: {
      type: String,
      required: true,
      trim: true,
    },
    cars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    ],
    profilePhoto: {
      type: Object,
      default: {
        url: "https://arabity.s3.eu-north-1.amazonaws.com/65c7278572dc95b3ed6b40c0/d231a030-ec3a-11ee-8990-d3828d412366.jpeg",
        key: "65c7278572dc95b3ed6b40c0/d231a030-ec3a-11ee-8990-d3828d412366.jpeg",
      },
    },
    workshopBranches: [
      {
        province: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Province",
        },
        city: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "City",
        },
        address: String,
        mobile: String,
      },
    ],
    workshopDescription: {
      type: String,
    },
    workshopServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    // reports: [
    //   {
    //     user: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User",
    //     },
    //     text: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
    views: {
      type: Array,
    },
    // socialMedia: [
    //   {
    //     type: String,
    //     default: { url: "" },
    //   },
    // ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// populate ratings
MechanicSchema.virtual("mechanicRatings", {
  ref: "MechanicRating",
  foreignField: "mechanic",
  localField: "_id",
});

MechanicSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

MechanicSchema.methods.getSignedToken = function () {
  const accessToken = jwt.sign(
    { id: this._id, userType: "Mechanic" },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1min",
    }
  );
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "60d",
    }
  );
  return { accessToken, refreshToken };
};

MechanicSchema.methods.getToken = function (secret) {
  const randomstring = crypto.randomBytes(20).toString("hex");
  const token = jwt.sign(
    {
      randomstring,
      id: this._id,
    },
    secret,
    {
      expiresIn: "30m",
    }
  );

  return token;
};

function checkUserEmailOrPhone(userInput) {
  // Function to check if the input is an email
  const isEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const isPhone = (input) => {
    const mobileRegex = /^(?:\+\d{1,3}\s?)?\d{10}$/;
    return mobileRegex.test(input);
  };

  if (isEmail(userInput)) {
    return "email";
  } else if (isPhone(userInput)) {
    return "phone";
  } else {
    return "Invalid input. Please enter a valid email or phone number.";
  }
}

function validateCreateMechanic(obj) {
  const schema = Joi.object({
    username: Joi.string().min(1).required(),
    email: Joi.string().min(1).required(),
    password: Joi.string().min(8).required(),
    workshopName: Joi.string().min(1).required(),
    workshopBranches: Joi.array()
      .items(
        Joi.object({
          province: Joi.string().id().required(),
          city: Joi.string().id().required(),
          address: Joi.string().min(3).required(),
          mobile: Joi.string().min(1).required(),
        })
      )
      .required(),
    workshopServices: Joi.array().required(),
    cars: Joi.array().required(),
  });
  return schema.validate(obj);
}

function validateUpdateMechanic(obj) {
  const schema = Joi.object({
    username: Joi.string().min(1),
    password: Joi.string().min(8),
    workshopName: Joi.string().min(1),
    workshopBranches: Joi.array().items(
      Joi.object({
        province: Joi.string().id().required(),
        city: Joi.string().id().required(),
        address: Joi.string().min(1).required(),
        mobile: Joi.string().min(1).required(),
      })
    ),
    workshopServices: Joi.array(),
    cars: Joi.array(),
    workshopDescription: Joi.string().allow(""),
    profilePhoto: Joi.object({
      url: Joi.string(),
      key: Joi.string(),
    }),
  });
  return schema.validate(obj);
}

function validateLoginMechanic(obj) {
  const schema = Joi.object({
    email: Joi.string()
      .min(1)
      .required()
      .email()
      .regex(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(obj);
}

const Mechanic = mongoose.model("Mechanic", MechanicSchema);

module.exports = {
  Mechanic,
  validateCreateMechanic,
  validateLoginMechanic,
  validateUpdateMechanic,
  checkUserEmailOrPhone,
};
