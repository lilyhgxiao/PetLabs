// This module holds the connection to the mongo server between express and mongo through the mongoose api.

const mongoose = require('mongoose');

// Get the data for the local URI or the one sepcified by the deployment environment.
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/PetLabsAPI';

// Connect to the mongo server
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Export the active connection
module.exports = { mongoose };