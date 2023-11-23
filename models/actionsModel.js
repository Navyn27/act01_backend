const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const actionsSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    permittedUsers: {
      type: Array,
      required: true,
    },
  },
  {
    collection: "chrishotel_mgmt",
  }
);

module.exports = mongoose.model("Action", actionsSchema);
