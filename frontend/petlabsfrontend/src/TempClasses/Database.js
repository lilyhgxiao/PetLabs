import User from "./User";
import Pet from "./Pet";
import PetType from "./PetType";

import petHappy from '../Images/pet_happy_placeholder.png';
import petNeutral from '../Images/pet_neutral_placeholder.png';
import petSad from '../Images/pet_sad_placeholder.png';

const Database = {
    currUser: null,

    userList: [
        new User('user', 'user', false),
        new User('user0', 'user', false),
        new User('user1', 'user', false),
        new User('user2', 'user', false),
        new User('admin', 'admin', true),
    ],
    
    petList: [
        new Pet(0, 'Alex', 'user', 'Blob'),
        new Pet(1, 'Luke', 'user', 'Flower'),
        new Pet(2, 'Lily', 'user', 'Fireball'),
        new Pet(0, 'Help', 'user0', 'Pet Rock'),
    ],
    
    itemList: [
    
    ],

    petTypes: [
        new PetType('Blob', petNeutral, petHappy, petSad, 1, 1, 1, 1, 1, 1, 1),
        new PetType('Flower', petNeutral, petHappy, petSad, 1, 1, 1, 1, 1, 1, 1),
        new PetType('Fireball', petNeutral, petHappy, petSad, 1, 1, 1, 1, 1, 1, 1),
        new PetType('Pet Rock', petNeutral, petHappy, petSad, 1, 1, 1, 1, 1, 1, 1),
    ],
};

export default Database;