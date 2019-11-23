// Get the express module
const express = require('express');

// Start the express server
const app = express();

// Get the mongoose module holding the connection to the mongo server.
const { mongoose } = require('./db/mongoose');

// import mongoose models
const { Item } = require('./models/item');
const { PetType } = require('./models/petType');
const { Pet } = require('./models/pet');

// Get module that validates ObjectID's for mongodb.
const { ObjectID } = require('mongodb');

// Import the bodyparser middleware to parse an HTTP JSON body into a usable object.
const bodyParser = require('body-parser');

// Use the body parse middleware between requests.
app.use(bodyParser.json()); 

// ROUTES FOLLOW

// ITEM ROUTES

// POST route to create an item.
app.post('/items', (request, response) => {
    // Create a new item using the mongoose Item model.
    const item = new Item({
        name: request.body.name,
        strength: request.body.strength,
        speed: request.body.speed,
        intelligence: request.body.intelligence,
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

// DELETE route to remove an item with a particulart id
app.delete('/items/:id', (request, response) => {
    // Get the id from the from the URL
    const id = request.params.id;

    // Check for a valid mongodb id
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    // Attempt to remove the item with the specefied id
    Item.findByIdAndRemove(id).then((result) => {
        if (!result) {
            response.status(404).send();
        } else {
            response.status(200).send(result);
        }
    }).catch((error) => {
        response.status(500).send(error);
    })
})

// PET TYPES

// POST route to create a new petType.
app.post('/pettypes', (request, response) => {
    // Create a new petType using the mongoose petType model.
    const petType = new PetType({
        name: request.body.name,
        // neutralImage: ,
        // happyImage: ,
        // sadImage: ,
        strengthRate: request.body.strengthRate,
        speedRate: request.body.speedRate,
        intelligenceRate: request.body.intelligenceRate,
        happinessRate: request.body.happinessRate,
        fullnessRate: request.body.fullnessRate,
        price: request.body.price
    });

    // Save the petType to the database.
    petType.save().then((result) => {
        response.status(200).send(result);
    }, (error) => {
        response.status(400).send(error);
    });
});

// GET route to get all petTypes
app.get('/pettypes', (request, response) => {
    PetType.find().then((result) => {
        response.status(200).send(result);
    }, (error) => {
        response.status(500).send(error);
    });
});

// GET route to get a specific petType 
app.get('/pettypes/:id', (request, response) => {
    // Extract the id from the URL wildcard
    const id = request.params.id;

    // Validate the id to ensure it is a valid mongodb id.
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    // Find the petType by ID
    PetType.findById(id).then((result) => {
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

// PATCH route to update an petType
app.patch('/pettypes/:id', (request, response) => {
    // Get the petType id from the URL
    const id = request.params.id;

    // Check for a valid mongodb id
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    // Get the object with properties to update.
    const update = getPetTypePropertiesToUpdate(request);

    // Attempt to update the item with the specified id.
    PetType.findByIdAndUpdate(id, { $set: update }, { new: true }).then((result) => {
        if (!result) {
            response.status(404).send();
        } else {
            response.status(200).send(result);
        }
    }).catch((error) => {
        response.status(500).send(error);
    });
});

// DELETE route to remove a petType with a particulart id
app.delete('/pettypes/:id', (request, response) => {
    // Get the id from the from the URL
    const id = request.params.id;

    // Check for a valid mongodb id
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    // Attempt to remove the petType with the specefied id
    PetType.findByIdAndRemove(id).then((result) => {
        if (!result) {
            response.status(404).send();
        } else {
            response.status(200).send(result);
        }
    }).catch((error) => {
        response.status(500).send(error);
    })
})

// PET ROUTES

// POST route to create a new petType.
app.post('/pets', (request, response) => {
    // Create a new petType using the mongoose petType model.
    const pet = new Pet({
        ownerName: request.body.ownerName,
        petName: request.body.petName,
        type: request.body.type,
        // neutralImage: ,
        // happyImage: ,
        // sadImage: ,
        strength: request.body.strength,
        speed: request.body.speedRate,
        intelligence: request.body.intelligence,
        happiness: request.body.happiness,
        fullness: request.body.fullness,
        price: request.body.price
    });

    // Save the petType to the database.
    pet.save().then((result) => {
        response.status(200).send(result);
    }, (error) => {
        response.status(400).send(error);
    });
});

// GET route to get all pets
app.get('/pets', (request, response) => {
    Pet.find().then((result) => {
        response.status(200).send(result);
    }, (error) => {
        response.status(500).send(error);
    });
});

// GET route to get a pet with a specific id
app.get('/pets/:id', (request, response) => {
    // Extract the id from the URL wildcard
    const id = request.params.id;

    // Validate the id to ensure it is a valid mongodb id.
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    // Find the pet by ID
    Pet.findById(id).then((result) => {
        if (!result) {
            response.status(404).send();
        } else {
            response.status(200).send(result)
        }
    },).catch((error) => {
        response.status(500).send(error);
    });
});

// PATCH route to update an petType
app.patch('/pets/:id', (request, response) => {
    // Get the petType id from the URL
    const id = request.params.id;

    // Check for a valid mongodb id
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    // Get the object with properties to update.
    const update = getPetPropertiesToUpdate(request);

    // Attempt to update the item with the specified id.
    Pet.findByIdAndUpdate(id, { $set: update }, { new: true }).then((result) => {
        if (!result) {
            response.status(404).send();
        } else {
            response.status(200).send(result);
        }
    }).catch((error) => {
        response.status(500).send(error);
    });
});

// DELETE route to delete a pet.
app.delete('/pets/:id', (request, response) => {
    // Get the id from the from the URL
    const id = request.params.id;

    // Check for a valid mongodb id
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    // Attempt to remove the pet with the specefied id
    Pet.findByIdAndRemove(id).then((result) => {
        if (!result) {
            response.status(404).send();
        } else {
            response.status(200).send(result);
        }
    }).catch((error) => {
        response.status(500).send(error);
    })
})

// HELPER FUNCTIONS

// Helper function that returns an object with all the properties to be update in the item.
function getItemPropertiesToUpdate(request) {
    const update = {};

    if (request.body) {
        if (request.body.name) update.name = request.body.name;

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

function getPetTypePropertiesToUpdate(request) {
    const update = {};

    if (request.body) {
        if (request.body.name) update.name = request.body.name;

        if (request.body.neutralImage) update.neutralImage = request.body.neutralImage;
        if (request.body.happyImage) update.happyImage = request.body.happyImage;
        if (request.body.sadImage) update.sadImage = request.body.sadImage;

        if (request.body.strengthRate) update.strengthRate = request.body.strengthRate;
        if (request.body.speedRate) update.speedRate = request.body.speedRate;
        if (request.body.intelligenceRate) update.intelligenceRate = request.body.intelligenceRate;
        if (request.body.happinessRate) update.happinessRate = request.body.happinessRate;
        if (request.body.fullnessRate) update.fullnessRate = request.body.fullnessRate;

        if (request.body.price) update.price = request.body.price;
    }

    return update;
}

function getPetPropertiesToUpdate(request) {
    const update = {};

    if (request.body) {
        if (request.body.ownerName) update.ownerName = request.body.ownerName;
        if (request.body.petName) update.petName = request.body.petName;
        if (request.body.type) update.type = request.body.type;

        if (request.body.strength) update.strength = request.body.strength;
        if (request.body.speed) update.speed = request.body.speed;
        if (request.body.intelligence) update.intelligence = request.body.intelligence;
        if (request.body.happiness) update.happiness = request.body.happiness;
        if (request.body.fullness) update.fullness = request.body.fullness;
        
        if (request.body.alive) update.alive = request.body.alive;
    }

    return update;
}

// Create a port for the express server
const port = process.env.PORT || 3001;

// Make the app listen on this port
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})