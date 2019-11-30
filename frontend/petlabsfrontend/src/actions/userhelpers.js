import { setState, setEmptyState, convertJSON } from "./helpers";
import { getState } from "statezero";

//temp, delete later
import Database from '../TempClasses/Database';

const bcrypt = require('bcryptjs')

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
    const { username, password } = getState("loginForm");
    const userReq = getUserByUsername(username);
    let success = true;

    return userReq.then((user) => {
        if (user === null) {
            success = false;
        }

        //authentication. hash password here
        const checkHashReq = checkHash(password, user.password);

        return checkHashReq.then((result) => {
            if (!result) {
                success = false;
            }
    
            if (success) {
                Database.currUser = user //temp, delete later
    
                setState("currUser", user);
                setState("currUser.passwordLength", password.length)
                return {isAdmin: user.isAdmin, loginSuccessful: true}
            } else {
                alert('Invalid username/password combination. Please try again.');
                return {isAdmin: false, loginSuccessful: false}
            }
        })
    })
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

    return new Promise((resolve, error) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {  
                if (err) {
                    return error(err)
                } 
                else {
                    resolve(hash)
                }
            });
        });
    }).then((hash) => {
        const newUserBody = {
            username: newUser.username,
            password: hash,
            isAdmin: newUser.isAdmin
        };
        //DB CALL: CREATE USER
        const createReq = createNewUser(newUserBody);
        return createReq.then((user) => {
            const currUser = getState("currUser");

            const newCurrUser = {
                _id: user._id,
                username: user.username,
                password: user.password,
                isAdmin: user.isAdmin,
                gold: user.gold,
                petIdList: user.petIdList,
                itemIdList: user.itemIdList
            }

            if(currUser === null) {
                setState("currUser", newCurrUser);
            }

            //temp, delete later
            newUser._id = newCurrUser._id;
            Database.userList.push(newUser);

            return true;
        }).catch((error) => {
            console.log(error)
            return false;
        });
    })

    
}



export const updateUserPassword = (password, targetUserId) => {
    //HASH
    return new Promise((resolve, error) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {  
                if (err) {
                    return error(err)
                } 
                else {
                    resolve(hash)
                }
            });
        });
    }).then((hash) => {
        const newPassBody = {
            password: hash
        };
        //DB CALL: CREATE USER
        const updateReq = updateUserState(newPassBody, targetUserId);
        return updateReq.then((result) => {
            const currUser = getState("currUser");
            
            if (currUser._id === targetUserId) {
                setState("currUser.passwordLength", password.length)
            }
            return true;
        }).catch((error) => {
            console.log(error)
            return false;
        });
    })
}


export const checkHash = (pass, hashedPass) => {
    return new Promise((resolve, error) => {
        bcrypt.compare(pass, hashedPass, (err, res) => {  
            if (err) {
                error(err)
            }
            resolve(res)
        });
    }).then((result) => {
        return result;
    }).catch((error) => {
        console.log(error);
    })
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
                if (currUser._id === targetUserId) {
                    for (const property in state) {
                        setState(`currUser.${property}`, state[property])
                    }
                    changeUser(getState("currUser")); //delete later
                }
                return true;
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
            //const usersFiltered = users.filter(usr -> usr['username'] === username)
            //if (usersFiltered.length < 1) {
            //    return null
            //} else {
            //    return usersFiltered[0]
            //}
            return null;
        }).catch((error) => {
            console.log(error);
        });
}

export const createNewUser = (newUser) => {
    const url = "http://localhost:3001/users"

    const request = new Request(url, {
        method: "POST",
        body: JSON.stringify(convertJSON(newUser)),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    console.log(JSON.stringify(convertJSON(newUser)))

    return fetch(request)
        .then((res) => {
            if (res.status === 200) {
                console.log("createNewUser changed DB")
                return res.json();
            }
        }).catch((error) => {
            console.log(error);
            return false;
        });
}