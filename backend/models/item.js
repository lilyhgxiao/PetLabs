// User mongoose model
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
    },
    strength: {
        type: Number,
		required: true,
    },
    speed: {
        type: Number,
		required: true,
    },
    intelligence: {
        type: Number,
		required: true,
    },
    happiness: {
        type: Number,
		required: true,
    },
    fullness: {
        type: Number,
		required: true,
    },
    // // imgURL: {
    // //     type: ,
    // //     required:
    // // },
    price: {
        type: Number,
		required: true,
    },
});

const Item = mongoose.model('Item', schema, 'Items');

module.exports = { Item };