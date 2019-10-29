class User {
    constructor(username, password, isAdmin) {
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
        this.petList = []; // Should be removed
        this.itemList = []; // Should be removed
        this.petIdList = [];
        this.itemIdList = [];
        this.gold = 100;
    }
}

export default User;