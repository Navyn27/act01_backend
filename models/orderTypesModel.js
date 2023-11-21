const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderTypesModel = new Schema({
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("OrderType", orderTypesModel);
