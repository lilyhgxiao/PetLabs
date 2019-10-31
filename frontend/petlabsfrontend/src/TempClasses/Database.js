import User from "./User";
import Pet from "./Pet";
import PetType from "./PetType";
import Item from "./Item";

import petHappy from '../Images/pet_happy_placeholder.png';
import petNeutral from '../Images/pet_neutral_placeholder.png';
import petSad from '../Images/pet_sad_placeholder.png';

import DumbellImage from '../Images/Dumbell.png';
import BookImage from '../Images/Book.png';
import TreadmillImage from '../Images/Treadmill.png';

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
        new Pet('Alex', 'user', 'Blob'),
        new Pet('Luke', 'user', 'Flower'),
        new Pet('Lily', 'user', 'Fireball'),
        new Pet('Help', 'user0', 'Pet Rock'),
    ],
    
    itemList: [
        new Item('Dumbell', 5, 1, 0, 3, -3, DumbellImage, 1000),
        new Item('Book', 0, 0, 5, 2, 0, BookImage, 2000),
        new Item('Treadmill', 2, 5, 0, 4, -3, TreadmillImage, 3000)
    ],

    petTypes: [
        new PetType('Blob', petNeutral, petHappy, petSad, 1, 1, 1, 1, 1, 4000),
        new PetType('Flower', petNeutral, petHappy, petSad, 2, 2, 2, 2, 2, 5000),
        new PetType('Fireball', petNeutral, petHappy, petSad, 3, 3, 3, 3, 3, 6000),
        new PetType('Pet Rock', petNeutral, petHappy, petSad, 4, 4, 4, 4, 4, 7000),
    ],

    // nextItemId: 0,

    // getNextItemId: function() {
    //     return this.nextItemId++;
    // }
};

export default Database;