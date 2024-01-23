const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userTypeSchema = new Schema(
  {
    userType: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: "userTypes",
  }
);

module.exports = mongoose.model("UserType", userTypeSchema);
