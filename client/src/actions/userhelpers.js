import { setState, setEmptyState, convertJSON } from "./helpers";
import { getState } from "statezero";

const bcrypt = require('bcryptjs')


export const readCookie = () => {
    const url = "/cookie/check-session";

    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.user) {
                const url = "/users/" + json.user;

                const request = new Request(url, {
                    method: "get",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                });

                fetch(request)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("Got user successfully on cookie")
                            return res.json();
                        } else {
                            console.log("Status code is wrong")
                            return null
                        }
                    }).then((user) => {
                        if (user === null) {
                            setEmptyState();
                        } else {
                            const currUser = {
                                _id: user._id,
                                username: user.username,
                                password: user.password,
                                isAdmin: user.isAdmin,
                                gold: user.gold,
                                petIdList: user.petIdList,
                                itemIdList: user.itemIdList,
                                passwordLength: 5
                            }
                            setState("currUser", currUser);
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                    return true, json
            } else {
                return false, json
            }
        }).then((result, json) => {
            if (!result) {
                return false, json
            }
            if (json && json.pet) {
                const url = "/pets/" + json.pet;

                const request = new Request(url, {
                    method: "get",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                });

                fetch(request)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("Got pet successfully on cookie")
                            return res.json();
                        } else {
                            console.log("Status code is wrong")
                            return null
                        }
                    }).then((pet) => {
                        if (pet === null) {
                            const currPet = null;
                        } else {
                            const currPet = {
                                _id: pet._id,
                                ownerName: pet.ownerName,
                                petName: pet.petName,
                                happiness: pet.happiness,
                                fullness: pet.fullness,
                                alive: pet.alive,
                                strength: pet.strength,
                                speed: pet.speed,
                                intelligence: pet.intelligence,
                                type: pet.type
                            }
                            setState("currPet", currPet);
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                    return true, json
            } else {
                return false, json
            }
        }).then((result, json) => {
            if (json && json.lastVisitedPage) {
                setState("lastVisitedPage", json.lastVistedPage);
                return true
            }
            return true
        }).then((result) => {
            return result
        })
        .catch(error => {
            console.log(error);
        });
};


export const setLastPage = (page) => {
    const url = "/cookie/lastVisitedPage/" + page;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return true
            }
        }).then((res) => {
            setState("lastVisitedPage", page);
        })
        .catch((error) => {
            console.log(error);
            return false;
        })
}


export const login = () => {
    //DB CALL: FIND USER
    const { username, password } = getState("loginForm");
    //const userReq = getUserByUsername(username);
    let success = true;

    const url = "/users/login/" + username;
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
            } else if (res.status === 404) {
                return null
            }
        }).then((users) => {
            if (users === null) {
                return {isAdmin: false, loginSuccessful: false}
            } else {
                const checkHashReq = checkHash(password, users.password);
                return checkHashReq.then((result) => {
                    if (!result) {
                        success = false;
                    }
                    if (success) {
                        setState("currUser", users);
                        setState("currUser.passwordLength", password.length)
                        return {isAdmin: users.isAdmin, loginSuccessful: true}
                    } else {
                        
                        return {isAdmin: false, loginSuccessful: false}
                    }
                })
            }
        }).catch((error) => {
            console.log(error);
            return {isAdmin: null, loginSuccessful: null}
        });
}

export const logout = () => {
    const url = "/users/logout/";
    const request = new Request(url, {
        method: "post",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    return fetch(request)
        .then((res) => {
            if (res.status === 200) {
                if (getState("currUser") !== null) {
                    alert("Logged out successfully.");
                }
                setEmptyState();
                return true;
            }
        }).catch((error) => {
            console.log(error);
            return false;
        })
    
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

            if(currUser === null) {
                const url = "/users/login/" + user.username;
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
                    }).then((userToLogin) => {
                        const newCurrUser = {
                            _id: userToLogin._id,
                            username: userToLogin.username,
                            password: userToLogin.password,
                            isAdmin: userToLogin.isAdmin,
                            gold: userToLogin.gold,
                            petIdList: userToLogin.petIdList,
                            itemIdList: userToLogin.itemIdList,
                            passwordLength: newUser.password.length
                        }
                        setState("currUser", newCurrUser);
                        return true;
                    }).catch((error) => {
                        console.log(error)
                        return false;
                    })
            } else {
                return true;
            }
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
    // const url = "http://localhost:3001/users/" + targetUserId;
    const url = "/users/" + targetUserId;

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(convertJSON(state)),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    return fetch(request)
        .then((res) => {
            if (res.status === 200) {
                //if it succeeds, and targetPetId === currPet call:
                const currUser = getState("currUser");
                if (currUser._id === targetUserId) {
                    for (const property in state) {
                        setState(`currUser.${property}`, state[property])
                    }
                }
                return true;
            }
        }).catch((error) => {
            console.log(error);
            return false;
        });
}


export const getUserByUsername = (username) => {
    // const url = "http://localhost:3001/users/";
    const url = "/users/";
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
            return null;
        }).catch((error) => {
            console.log(error);
        });
}


export const createNewUser = (newUser) => {
    // const url = "http://localhost:3001/users"
    const url = "/users"

    const request = new Request(url, {
        method: "POST",
        body: JSON.stringify(convertJSON(newUser)),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

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