const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const PraticeSesssionTypeSchema = new mongoose.Schema({

    practiceSessionTypeName: {
        type: String,
        trim: true,
        required: [true, 'Practice session type is required'],
        maxlength: 70,
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },

}, { timestamps: true })

module.exports = mongoose.model("psessionsType", PraticeSesssionTypeSchema);