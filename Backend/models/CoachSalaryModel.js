const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  salary: {
    type: String,
  },
  bonus: {
    type: String,
  },
  total: {
    type: String,
  },
});

module.exports = mongoose.model("CoachSalary", EmployeeSchema);
