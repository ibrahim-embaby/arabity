const mongoose = require("mongoose");

const UserRequestPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  desc: {
    type: String,
    required: true,
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
});

const UserRequestPost = mongoose.model(
  "UserRequestPost",
  UserRequestPostSchema
);

module.exports = {
  UserRequestPost,
};
