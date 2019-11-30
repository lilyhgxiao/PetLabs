import User from "./User";
import Pet from "./Pet";
import PetType from "./PetType";
import Item from "./Item";

import blob_happy from '../Images/blob_happy.png';
import blob_neutral from '../Images/blob_neutral.png';
import blob_sad from '../Images/blob_sad.png';

import flower_happy from '../Images/flower_happy.png';
import flower_neutral from '../Images/flower_neutral.png';
import flower_sad from '../Images/flower_sad.png';

import fireball_happy from '../Images/fireball_happy.png';
import fireball_neutral from '../Images/fireball_neutral.png';
import fireball_sad from '../Images/fireball_sad.png';

import petrock_neutral from '../Images/petrock_neutral.png';

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
        new Item('Dumbbell', 5, 1, 0, 3, -3, DumbellImage, 1000),
        new Item('Book', 0, 0, 5, 2, 0, BookImage, 2000),
        new Item('Treadmill', 2, 5, 0, 4, -3, TreadmillImage, 3000),
    ],

    petTypes: [
        new PetType('Blob', blob_neutral, blob_happy, blob_sad, 1, 1, 1, 1, 1, 100),
        new PetType('Flower', flower_neutral, flower_happy, flower_sad, 2, 2, 2, 2, 2, 5000),
        new PetType('Fireball', fireball_neutral, fireball_happy, fireball_sad, 3, 3, 3, 3, 3, 6000),
        new PetType('Pet Rock', petrock_neutral, petrock_neutral, petrock_neutral, 0, 0, 0, 0, 0, 7000),
    ],
};

const userId = "5de0755e7dc865116d45d30c";
const alexId = "5de0b0a23e933e0481cae985";

const dumbbellId = "5de0a4c83e933e0481cae979";
const bookId = "5de0a4c03e933e0481cae978";
const treadmillId = "5de0a4cf3e933e0481cae97a";

Database.userList[0].petIdList.push(alexId);
Database.userList[0].petIdList.push(2);
Database.userList[0].petIdList.push(3);

Database.userList[1].petIdList.push(2);
Database.userList[1].petIdList.push(3);
Database.userList[1].petIdList.push(4);

Database.userList[2].petIdList.push(1);
Database.userList[2].petIdList.push(2);
Database.userList[2].petIdList.push(3);

Database.userList[3].petIdList.push(2);
Database.userList[3].petIdList.push(3);
Database.userList[3].petIdList.push(4);


Database.userList[0].itemIdList.push(dumbbellId);
Database.userList[0].itemIdList.push(treadmillId);
//Database.userList[0].itemIdList.push(3);

Database.userList[1].itemIdList.push(1);
Database.userList[1].itemIdList.push(2);
Database.userList[1].itemIdList.push(3);

Database.userList[2].itemIdList.push(1);
Database.userList[2].itemIdList.push(2);
Database.userList[2].itemIdList.push(3);

Database.userList[3].itemIdList.push(1);
Database.userList[3].itemIdList.push(2);
Database.userList[3].itemIdList.push(3);

Database.petList[0].id = alexId;

Database.itemList[0].id = dumbbellId;
Database.itemList[1].id = bookId;
Database.itemList[2].id = treadmillId;

Database.userList[0].id = userId;

export default Database;