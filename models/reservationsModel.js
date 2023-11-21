const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationsSchema = new Schema(
  {
    reservationType: {
      type: Schema.Types.ObjectId,
      ref: "reservationType",
      required: true,
    },
    userFirstName: {
      type: String,
      required: true,
    },
    userLastName: {
      type: Array,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reservation", reservationsSchema);
