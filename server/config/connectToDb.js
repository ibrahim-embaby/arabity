const mongoose = require("mongoose");

module.exports = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("connected to db");
  } catch (error) {
    console.log("ERROR ON CONNECTION TO DB", error);
  }
};
