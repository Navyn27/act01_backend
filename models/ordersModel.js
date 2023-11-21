const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ordersSchema = new Schema(
  {
    orderType: {
      type: Schema.Types.ObjectId,
      ref: "orderType",
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", ordersSchema);
