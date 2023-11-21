const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewsSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    userFirstName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    relevantDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewsSchema);
