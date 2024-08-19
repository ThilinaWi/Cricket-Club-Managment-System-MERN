const mongoose = require("mongoose"); //kalin wage mongoos add karanna

const Schema = mongoose.Schema; //schema set karanna

const CoordinatorSchema = new Schema({
  name: {
    type: String,//type
    required: true,
  },
  gmail: {
    type: String,//type
    required: true,
  },
  phone: {
    type: String,//type
    required: true,
  },
  provinces: {
    type: String,//type
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Coordinator", CoordinatorSchema); //schema eka send karanna
