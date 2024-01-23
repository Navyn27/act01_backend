const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderTypesModel = new Schema({
  orderType: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("OrderType", orderTypesModel);
