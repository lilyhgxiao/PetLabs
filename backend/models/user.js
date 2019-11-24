// User mongoose model
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: {
        type: String,
		required: true,
		minlength: 1,
		trim: true,
    },
    password: {
        type: String,
		required: true,
		minlength: 1,
		trim: true,
    },
    isAdmin: {
        type: Boolean,
		required: true,
    },
    petIdList: {
        type: Array,
        default: []
    },
    itemIdList: {
        type: Array,
        default: []
    },
    gold: {
        type: Number,
		default: 5000
    }
});

const User = mongoose.model('User', schema, 'Users');

module.exports = { User };