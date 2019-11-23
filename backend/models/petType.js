// this.name = name;
// this.neutralImage = neutralImage;
// this.happyImage = happyImage;
// this.sadImage = sadImage;
// this.strengthRate = strengthRate;
// this.speedRate = speedRate;
// this.intelligenceRate = intelligenceRate;
// this.fullnessRate = fullnessRate;
// this.happinessRate = happinessRate;
// this.price = price;

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
    // neutralImage : {

    // },
    // happyImage: {

    // },
    // sadImage: {

    // },
    strengthRate: {
        type: Number,
		required: true,
    },
    speedRate: {
        type: Number,
		required: true,
    },
    intelligenceRate: {
        type: Number,
		required: true,
    },
    happinessRate: {
        type: Number,
		required: true,
    },
    fullnessRate: {
        type: Number,
		required: true,
    },
    price: {
        type: Number,
		required: true,
    },
});

const PetType = mongoose.model('PetType', schema, 'PetTypes');

module.exports = { PetType };