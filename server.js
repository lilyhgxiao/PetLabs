// Get the express module
const express = require('express');

// Start the express server
const app = express();

const cors = require('cors');
app.use(cors());

// Get the mongoose module holding the connection to the mongo server.
const { mongoose } = require('./db/mongoose');

// import mongoose models
const { Item } = require('./models/item');
const { PetType } = require('./models/petType');
const { Pet } = require('./models/pet');
const { User } = require('./models/user');

// Get module that validates ObjectID's for mongodb.
const { ObjectID } = require('mongodb');

// Import the bodyparser middleware to parse an HTTP JSON body into a usable object.
const bodyParser = require('body-parser');

// Use the body parse middleware between requests.
app.use(bodyParser.json()); 

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

// Create a session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000000,
            httpOnly: true
        }
    })
);

// ROUTES FOLLOW

// ITEM ROUTES

// POST route to create an item.
app.post('/items', (request, response) => {
    Item.findOne({name: request.body.name}, (error, item) => {
        if (!request.session.user || !request.session.isAdmin) {
            response.status(401).send();
            return;
        }
        if (error) {
            response.send(error);
        } else if (item) {
            // Conflict, item with this name exists.
            response.status(409).send();
        } else {
            // Item with this name does not exist yet.
            // response.status(404).send();
            
            // Create a new item using the mongoose Item model.
            const item = new Item({
                name: request.body.name,
                strength: request.body.strength,
                speed: request.body.speed,
                intelligence: request.body.intelligence,
                happiness: request.body.happiness,
                fullness: request.body.fullness,
                imgURL: request.body.imgURL,
                price: request.body.price
            });

            // Save the item to the database.
            item.save().then((result) => {
                response.status(200).send(result);
            }, (error) => {
                response.status(400).send(error);
            });
        }
    });
});

// GET route to get all items
app.get('/items', (request, response) => {
    if (!request.session.user || !request.session.isAdmin) {
        response.status(401).send();
        return;
    }
    Item.find().then((result) => {
        response.status(200).send(result);
    }, (error) => {
        response.status(500).send(error);
    });
});

// GET route to get a specific item 
app.get('/items/:id', (request, response) => {
    if (!request.session.user) {
        response.status(401).send();
        return;
    }
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
    if (!request.session.user || !request.session.isAdmin) {
        response.status(401).send();
        return;
    }

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
    PetType.findOne({name: request.body.name}, (error, petType) => {
        if (!request.session.user || !request.session.isAdmin) {
            response.status(401).send();
            return;
        }
        if (error) {
            response.send(error);
        } else if (petType) {
            // Conflict, PetType with this name exists.
            response.status(409).send();
        } else {
            // PetType with this name does not exist yet.
            // response.status(404).send();
            
            // Create a new petType using the mongoose petType model.
            const petType = new PetType({
                name: request.body.name,
                neutralImage: request.body.neutralImage,
                happyImage: request.body.happyImage,
                sadImage: request.body.sadImage,
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
        }
    });
});

// GET route to get all petTypes
app.get('/pettypes', (request, response) => {
    if (!request.session.user || !request.session.isAdmin) {
        response.status(401).send();
        return;
    }
    PetType.find().then((result) => {
        response.status(200).send(result);
    }, (error) => {
        response.status(500).send(error);
    });
});

// GET route to get a specific petType 
app.get('/pettypes/:id', (request, response) => {
    if (!request.session.user) {
        response.status(401).send();
        return;
    }
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
    if (!request.session.user || !request.session.isAdmin) {
        response.status(401).send();
        return;
    }
    // Get the petType id from the URL
    const id = request.params.id;

    // Check for a valid mongodb id
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    // Get the object with properties to update.
    const update = getPetTypePropertiesToUpdate(request);

    // Attempt to update the petType with the specified id.
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

// POST route to create a new pet.
app.post('/pets', (request, response) => {
    PetType.findOne({name: request.body.petName}, (error, pet) => {
        if (!request.session.user) {
            response.status(401).send();
            return;
        }
        if (error) {
            response.send(error);
        } else if (pet) {
            // Conflict, Pet with this name exists.
            response.status(409).send();
        } else {
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

            // Save the pet to the database.
            pet.save().then((result) => {
                response.status(200).send(result);
            }, (error) => {
                response.status(400).send(error);
            });
        }
    });
});

// GET route to get all pets
app.get('/pets', (request, response) => {
    if (!request.session.user) {
        response.status(401).send();
        return;
    }
    if (!request.session.user || !request.session.isAdmin) {
        response.status(401).send();
        return;
    }
    Pet.find().then((result) => {
        response.status(200).send(result);
    }, (error) => {
        response.status(500).send(error);
    });
});

// GET route to get a pet with a specific id
app.get('/pets/:id', (request, response) => {
    if (!request.session.user) {
        response.status(401).send();
        return;
    }
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
    if (!request.session.user) {
        response.status(401).send();
        return;
    }
    // Get the petType id from the URL
    const id = request.params.id;

    // Check for a valid mongodb id
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    // Get the object with properties to update.
    const update = getPetPropertiesToUpdate(request);

    // Attempt to update the pet with the specified id.
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

// USER ROUTES

// POST route to create a new user.
app.post('/users', (request, response) => {
    User.findOne({username: request.body.username}, (error, user) => {
        if (error) {
            response.send(error);
        } else if (user) {
            // Conflict, User with this username exists.
            response.status(409).send();
        } else {
            // Create a new petType using the mongoose petType model.
            const user = new User({
                username: request.body.username,
                password: request.body.password,
                isAdmin: request.body.isAdmin
            });

            // Save the petType to the database.
            user.save().then((result) => {
                response.status(200).send(result);
            }, (error) => {
                response.status(400).send(error);
            });     
        }
    });
});

// GET route to get all regular users.
app.get('/users', (request, response) => {
    if (!request.session.user || !request.session.isAdmin) {
        response.status(401).send();
        return;
    }
    User.find().then((result) => {
        response.status(200).send(result);
    }, (error) => {
        response.status(500).send(error);
    });
});

// GET route to get an individual user
app.get('/users/:id', (request, response) => {
    if (!request.session.user || !request.session.isAdmin) {
        response.status(401).send();
        return;
    }
    // Extract the id from the URL wildcard
    const id = request.params.id;

    // Validate the id to ensure it is a valid mongodb id.
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    // Find the user by ID
    User.findById(id).then((result) => {
        if (!result) {
            response.status(404).send();
        } else {
            response.status(200).send(result)
        }
    },).catch((error) => {
        response.status(500).send(error);
    });
});

// GET route to authinticate a user
app.get('/users/login/:username', (request, response) => {
    const username = request.params.username;

    User.findOne({username: username}).then((result) => {
        if (!result) {
            response.status(404).send();
        } else {
            request.session.user = result._id;
            request.session.isAdmin = result.isAdmin;
            response.status(200).send(result)
        }
    },).catch((error) => {
        response.status(500).send(error);
    });
});

// POST route to log user out.
app.post('/users/logout/', (request, response) => {
    // Remove the session
    request.session.destroy(error => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).send();
        }
    });
});

// PATCH route to update individual users
app.patch('/users/:id', (request, response) => {
    if (!request.session.user) {
        response.status(401).send();
        return;
    }
    // Get the petType id from the URL
    const id = request.params.id;

    // Check for a valid mongodb id
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    // Get the object with properties to update.
    const update = getUserPropertiesToUpdate(request);

    // Attempt to update the user with the specified id.
    User.findByIdAndUpdate(id, { $set: update }, { new: true }).then((result) => {
        if (!result) {
            response.status(404).send();
        } else {
            response.status(200).send(result);
        }
    }).catch((error) => {
        response.status(500).send(error);
    });
});

// DELETE route to delete individual users
app.delete('/users/:id', (request, response) => {
    // Get the id from the from the URL
    const id = request.params.id;

    // Check for a valid mongodb id
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    // Attempt to remove the pet with the specefied id
    User.findByIdAndRemove(id).then((result) => {
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

function getUserPropertiesToUpdate(request) {
    const update = {};

    if (request.body) {
        if (request.body.username) update.username = request.body.username;
        if (request.body.password) update.password = request.body.password;
        if (request.body.isAdmin) update.isAdmin = request.body.isAdmin;

        if (request.body.petIdList) update.petIdList = request.body.petIdList;
        if (request.body.itemIdList) update.itemIdList = request.body.itemIdList;
        
        if (request.body.gold) update.gold = request.body.gold;
    }

    return update;
}

const path = require('path');

const publicPath = path.join(__dirname, 'client/build')

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
})

// Create a port for the express server
const port = process.env.PORT || 3001;

// Make the app listen on this port
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})