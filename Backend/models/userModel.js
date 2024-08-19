
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const eventsHistorySchema=new mongoose.Schema({
    title: {
      type: String,
      trim: true,
     
      maxlength: 70,
  },
  
  description: {
      type: String,
      trim: true,
     
  },
  
  location: {
      type: String,
  },
  date: {
      type: Date,
  },
  eventstatus: {
      type: String,
      enum:[`pending`,`yes`,`no`],
      default:`pending`
  },
  user: {
      type: ObjectId,
      ref: "User",
      required: true
  },
  
  
  
  }, { timestamps: true })

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, 'first name is required'],
        maxlength: 32,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'last name is required'],
        maxlength: 32,
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'e-mail is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is required'],
        minlength: [6, 'password must have at least (6) caracters'],
    },
    
    phoneNumber: {
        type: String,
        trim: true,
        required: [true, 'Phone Number is Required'],
        match: [
            /^[0-9]{10}$/,
            'Please add a valid Phone Number'
        ]
    },
    cricketExperience: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    battingStyle: {
        type: String,
        enum: ['Right-handed', 'Left-handed']
    },
    bowlingStyle: {
        type: String,
        enum: ['Right-handed', 'Left-handed']
    },
    wicketkeepingExperience: {
        type: Boolean
    },
    guardianName: {
        type: String
    },
    guardianRelation: {
        type: String
    },
    guardianTp: {
        type: String,
        trim: true,
        match: [
            /^[0-9]{10}$/,
            'Please add a valid Phone Number'
        ]
    },
    preferredPlayingPosition: {
        type: String,
        enum: ['Batsman', 'Bowler', 'All-rounder']
    },
    eventsHistory:[eventsHistorySchema],
    role: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

//encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// return a JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}



module.exports = mongoose.model("User", userSchema);