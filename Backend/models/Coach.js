const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coachSchema = new Schema({
    
  name:{
      type : String ,
      required : true
  },
  age: {
    type : Number,
    required : true
   },
  gender:{
    type : String,
    required : true
  },
  tp: {
  type : Number,
  required : true
 },
  level: {
    type : String,
    required : true
  },
  age_group: {
      type : String,
      required : true
  },
  description: {
    type : String,
    required : true
  }
 
})

const Coach = mongoose.model("Coach",coachSchema);

module.exports = Coach; 