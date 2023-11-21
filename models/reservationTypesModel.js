const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationTypesModel = new Schema({
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    requires: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("ReservationType", reservationTypesModel);
