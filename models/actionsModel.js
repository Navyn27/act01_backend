const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const actionsSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  permittedUsers: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Action", actionsSchema);
