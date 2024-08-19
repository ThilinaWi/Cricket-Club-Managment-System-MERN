const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PerformanceSchema = new mongoose.Schema({

    PlayerId: {
        type: String,
        trim: true,
        required: [true, 'Player id is required'],
        unique: true,
        maxlength: 32,
    },
    LastName: {
        type: String,
        trim: true,
        required: [true, 'first name is required'],
        maxlength: 32,
    },
    Inits: {
        type: String,
        trim: true,
        required: [true, 'Intits req'],
        maxlength: 32,
    },
    MainRole: {
        type: String,
        trim: true,
        required: [true, 'Intits MainRole'],
        maxlength: 32,
    },
    Matches: {
        type: Number,
        trim: true,
        required: [true, 'No of Matches are required'],
        
    },
    Inns: {
        type: Number,
        trim: true,

        
    },
    No: {
        type: Number,
        trim: true,
 
        
    },
    Runs: {
        type: Number,
        trim: true,

        
    },
    HS: {
        type: Number,
        trim: true,
       
        
    },
    Ave: {
        type: Number,
        trim: true,
    
    },
   
    SR: {
        type: Number,
        trim: true,
   
        
    },
    Hundreds: {
        type: Number,
        trim: true,

    },
    Fifties:{
        type: Number,
        trim: true,

    },
    Sixes:{
        type: Number,
        trim: true,
  
    },
    Fours:{
        type: Number,
        trim: true,

        
    },



    Wickets: {
        type: Number,
        trim: true,

        
    },
    Overs: {
        type: Number,
        trim: true,

        
    },
    RunsInB: {
        type: Number,
        trim: true,

        
    },
    MainOvers: {
        type: Number,
        trim: true,

        
    },
    BAvg: {
        type: Number,
        trim: true,
   
        
    },
    Econ: {
        type: Number,
        trim: true,
    
    },
    BowlingSR: {
        type: Number,
        trim: true,

        
    },
    BBI: {
        type: Number,
        trim: true,
 
        
    },
    BBM: {
        type: Number,
        trim: true,
     
        
    },
   
    Ct:{
        type: Number,
        trim: true,
      
        
    },
    Runouts:{
        type: Number,
        trim: true,
   
        
    },
    St:{
        type: Number,
        trim: true,
      
        
    },

}, { timestamps: true })





module.exports = mongoose.model("Performance", PerformanceSchema);