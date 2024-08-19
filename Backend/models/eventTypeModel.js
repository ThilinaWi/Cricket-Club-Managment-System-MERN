const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const eventTypeSchema = new mongoose.Schema({

    eventTypeName: {
        type: String,
        trim: true,
        required: [true, 'event category is required'],
        maxlength: 70,
    },

    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })

module.exports = mongoose.model("eventType", eventTypeSchema);