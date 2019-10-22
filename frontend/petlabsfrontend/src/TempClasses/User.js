class User {
    constructor(username, password, isAdmin) {
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
        this.petList = [];
        this.itemList = [];
    }
}

export {User};