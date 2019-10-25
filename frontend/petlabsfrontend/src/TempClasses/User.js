class User {
    constructor(username, password, isAdmin) {
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
        this.petList = [];
        this.itemList = [];
        this.gold = 100;
    }
}

export default User;