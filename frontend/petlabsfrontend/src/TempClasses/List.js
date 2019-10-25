import User from "./User";
import Pet from "./Pet";
import PetType from "./PetType";

import petHappy from '../Images/pet_happy_placeholder.png';
import petNeutral from '../Images/pet_neutral_placeholder.png';
import petSad from '../Images/pet_sad_placeholder.png';

const Lists = {
    currUser: null,

    userList: [
        new User('user', 'user', false),
        new User('user0', 'user', false),
        new User('user1', 'user', false),
        new User('user2', 'user', false),
        new User('admin', 'admin', true),
    ],
    
    petList: [
        new Pet(0, 'Alex', 'user'),
        new Pet(1, 'Luke', 'user'),
        new Pet(2, 'Lily', 'user'),
        new Pet(0, 'Help', 'user0'),
    ],
    
    itemList: [
    
    ],

    petTypes: [
        new PetType('Blob', petNeutral, petHappy, petSad, 1, 'Anything'),
        new PetType('Flower', petNeutral, petHappy, petSad, 1, 'Water Cube'),
        new PetType('Fireball', petNeutral, petHappy, petSad, 1, 'Wood'),
        new PetType('Pet Rock', petNeutral, petHappy, petSad, 1, 'Nothing'),
    ],
};

export default Lists;