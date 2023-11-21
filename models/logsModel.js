const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: Schema.Types.ObjectId,
      ref: "Actions",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Log", logsSchema);
