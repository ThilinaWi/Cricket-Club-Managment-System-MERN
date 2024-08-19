const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const PraticeSesssion = new mongoose.Schema({

    practiceSessionName: {
        type: String,
        trim: true,
        required: [true, 'first name is required'],
        maxlength: 30,
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
        maxlength: 300,
    },
    date: {
        type: Date,
        trim: true,
        required: [true, 'Date is required'],
        min: [new Date(), 'Date cannot be in the past'], // Minimum date is today
        max: [new Date('2030-12-31'), 'Date cannot be after 2030-12-31'],
    },
    location: {
        type: String,
    },
    available: {
        type: Boolean,
        default:true
    },
    practiceSessionType: {
        type: ObjectId,
        ref: "psessionsType",
        required: true,
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: false
    },

}, { timestamps: true })

module.exports = mongoose.model("psessions", PraticeSesssion);
