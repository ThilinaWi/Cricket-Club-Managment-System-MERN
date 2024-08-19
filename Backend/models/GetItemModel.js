const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GetItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  studentId: { 
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("GetItem", GetItemSchema);
