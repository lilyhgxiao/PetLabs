import User from "./User";
import Pet from "./Pet";

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
};

export default Lists;