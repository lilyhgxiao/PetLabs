// User mongoose model
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    ownerName: {
        type: String,
		required: true,
		minlength: 1,
        trim: true,
        unique: true,
        sparse: true
    },
    petName: {
        type: String,
		required: true,
		minlength: 1,
        trim: true,
        unique: true,
        sparse: true
    },
    type: {
        type: String,
		required: true,
		minlength: 1,
        trim: true,
        unique: true,
        sparse: true
    },
    strength: {
        type: Number,
        default: 0
    },
    speed: {
        type: Number,
        default: 0
    },
    intelligence: {
        type: Number,
        default: 0
    },
    happiness: {
        type: Number,
        default: 50
    },
    fullness: {
        type: Number,
        default: 50
    },
    alive: {
        type: Boolean,
        default: true
    },
});

const Pet = mongoose.model('Pet', schema, 'Pets');

module.exports = { Pet };