import { setState, setEmptyState } from "./helpers";
import { getState } from "statezero";

//temp, delete later
import Database from '../TempClasses/Database';

//temporary, will be deleted later
const findUser = () => {
    const userList = Database.userList;
    const loginForm = getState("loginForm")
    for (let i = 0; i < userList.length; i ++) {
        if (loginForm.username === userList[i].username && loginForm.password === userList[i].password) {
            return userList[i];
        }
    }
    return null
}


export const login = () => {
    //DB CALL: FIND USER
    const userToLogin = findUser();

    //if login wasn't successful, show warning.
    if (userToLogin === null) {
        alert('Invalid username/password combination. Please try again.');
        return {isAdmin: false, loginSuccessful: false}
   }
   else {
        //delete later after updating admin views:
        //Database.currUser = userToLogin

        setState("currUser", userToLogin);
        return {isAdmin: userToLogin.isAdmin, loginSuccessful: true}
   }
}

export const logout = () => {
    setEmptyState();
}

export const updateLoginForm = field => {
    const { name, value } = field;
    setState(`loginForm.${name}`, value);
};

export const signup = (newUser) => {
    //HASH PASSWORD

    //DB CALL: CREATE USER
    Database.userList.push(newUser);

    //set statezero
    setState("currUser", newUser);
    return true
    //if it wasn't successful, show warning.


}



export const updateUserPassword = (password) => {
    //HASH: update this
    const hashedPass = password;

    //DB CALL: UPDATE USER PASSWORD
    
    //if it succeeds call:
    setState('currUser.password', hashedPass);
}

export const updateUserState = (state) => {
    //DB CALL: UPDATE USER
    //if it succeeds call:
    for (const property in state) {
        setState(`currUser.${property}`, state[property])
    }
    return true
}