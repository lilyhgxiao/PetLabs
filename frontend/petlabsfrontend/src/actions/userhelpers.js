import { setState, setEmptyState, convertJSON } from "./helpers";
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

//temp, delete later
const changeUser = (user) => {
    const userList = Database.userList;

    for (let i = 0; i < userList.length; i ++) {
        if (userList[i].id === user.id) {
            userList[i] = user;
            break;
        }
    }
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
        Database.currUser = userToLogin

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

export const updateUserState = (state, targetUserId) => {
    //DB CALL: UPDATE USER
    const url = "http://localhost:3001/users/" + targetUserId;

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(convertJSON(state)),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    console.log(JSON.stringify(convertJSON(state)))

    return fetch(request)
        .then((res) => {
            if (res.status === 200) {
                console.log("updateUserState changed DB", targetUserId)

                //if it succeeds, and targetPetId === currPet call:
                const currUser = getState("currUser");
                if (currUser.id === targetUserId) {
                    for (const property in state) {
                        setState(`currUser.${property}`, state[property])
                    }
                    changeUser(getState("currUser")); //delete later
                }
            }
        }).catch((error) => {
            console.log(error);
        });
}


export const getUserByUsername = (username) => {
    const url = "http://localhost:3001/users/";
    const request = new Request(url, {
        method: "get",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    return fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((users) => {
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === username) {
                    return users[i];
                }
            }
        }).catch((error) => {
            console.log(error);
        });
}