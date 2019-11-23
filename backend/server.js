// Get the express module
const express = require('express');

// Start the express server
const app = express();

// Get the mongoose module holding the connection to the mongo server.
const { mongoose } = require('./db/mongoose');

// import mongoose models
const { Item } = require('./models/item');

// Get module that validates ObjectID's for mongodb.
const { ObjectID } = require('mongodb');

// Import the bodyparser middleware to parse an HTTP JSON body into a usable object.
const bodyParser = require('body-parser');

// Use the body parse middleware between requests.
app.use(bodyParser.json()); 

// ROUTES FOLLOW

// ITEM

// POST route to create an item.
app.post('/items', (request, response) => {
    // Create a new item using the mongoose Item model.
    const item = new Item({
        name: request.body.name,
        strength: request.body.strength,
        speed: request.body.speed,
        intelligence: request.body.price,
        happiness: request.body.happiness,
        fullness: request.body.fullness,
        // imgURL: ,
        price: request.body.price
    });

    // Save the item to the database.
    item.save().then((result) => {
        response.status(200).send(result);
    }, (error) => {
        response.status(400).send(error);
    });
});

// GET route to get all items
app.get('/items', (request, response) => {
    Item.find().then((result) => {
        response.status(200).send(result);
    }, (error) => {
        response.status(500).send(error);
    });
});

// GET route to get a specific item 
app.get('/items/:id', (request, response) => {
    // Extract the id from the URL wildcard
    const id = request.params.id;

    // Validate the id to ensure it is a valid mongodb id.
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    // Find the object by ID
    Item.findById(id).then((result) => {
        // Could not find item with specified id
        if (!result) {
            response.status(404).send();
        } else {
            response.status(200).send(result)
        }
    },).catch((error) => {
        response.status(500).send(error);
    });
});

// PATCH route to update an item
app.patch('/items/:id', (request, response) => {
    // Get the item id from the URL
    const id = request.params.id;

    // Check for a valid mongodb id
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    // Get the object with properties to update.
    const update = getItemPropertiesToUpdate(request);

    // Attempt to update the item with the specified id.
    Item.findByIdAndUpdate(id, { $set: update }, { new: true }).then((result) => {
        // Ensure that an item with a specified id has been found.
        if (!result) {
            response.status(404).send();
        } else {
            response.status(200).send(result);
        }
    }).catch((error) => {
        response.status(500).send(error);
    });
});

// Helper function that returns an object with all the properties to be update in the item.
function getItemPropertiesToUpdate(request) {
    const update = {};

    if (request.body) {
        if (request.body.name) update.name = request.body.name
        if (request.body.strength) update.strength = request.body.strength;
        if (request.body.speed) update.speed = request.body.speed;
        if (request.body.intelligence) update.intelligence = request.body.intelligence;
        if (request.body.happiness) update.happiness = request.body.happiness;
        if (request.body.fullness) update.fullness = request.body.fullness;
        if (request.body.imgURL) update.imgURL = request.body.imgURL;
        if (request.body.price) update.price = request.body.price;
    }

    return update;
}

// Create a port for the express server
const port = process.env.PORT || 3001;

// Make the app listen on this port
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})