const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationTypesModel = new Schema({
  reservationType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    requires: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("ReservationType", reservationTypesModel);
