import { setState, convertJSON } from "./helpers";
import { getState } from "statezero";
import { getUserByUsername, updateUserState } from "./userhelpers"


export const setTargetPet = (pet) => {
    setState("currPet", pet);
}

export const updatePetState = (state, targetPetId) => {
    //DB CALL: UPDATE PET
    // const url = "http://localhost:3001/pets/" + targetPetId;
    const url = "/pets/" + targetPetId;

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(convertJSON(state)),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    fetch(request)
        .then((res) => {
            if (res.status === 200) {
                //if it succeeds, and targetPetId === currPet call:
                const currPet = getState("currPet");
                if (currPet._id === targetPetId) {
                    for (const property in state) {
                        setState(`currPet.${property}`, state[property])
                    }
                }
            }
        }).catch((error) => {
            console.log(error);
        })
    
    return true
}


export const createNewPet = (newPet) => {
    // const url = "http://localhost:3001/pets"
    const url = "/pets"

    const request = new Request(url, {
        method: "POST",
        body: JSON.stringify(convertJSON(newPet)),
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
        }).catch((error) => {
            console.log(error);
            return false;
        });
}


export const getAllPets = () => {
    // const url = "http://localhost:3001/pets";
    const url = "/pets";
    const request = new Request(url, {
        method: "get",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    return fetch(request)
        .then((res) => {
            console.log(res.status)
            if (res.status === 200) {
                return res.json();
            }
        }).then((pets) => {
            return pets;
        }).catch((error) => {
            console.log(error);
        });
}


export const deletePet = (targetPetId) => {
    //DB CALL: DELETE PET
    // const url = "http://localhost:3001/pets/" + targetPetId;
    const url = "/pets/" + targetPetId;

    const petRequest = new Request(url, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    return fetch(petRequest)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((pet) => {
            
            const userReq = getUserByUsername(pet.ownerName)

            const userResult = userReq.then((user) => {
                const userPetListIdx = user.petIdList.indexOf(targetPetId);
                user.petIdList.splice(userPetListIdx, 1);

                console.log(targetPetId, userPetListIdx)
                console.log(user.petIdList)

                updateUserState({ petIdList: user.petIdList }, user._id);
                setState("currUser.petIdList", user.petIdList);

                return true;
            }).catch((error) => {
                console.log(error);
                return false;
            })

            return userResult;

        }).catch((error) => {
            console.log(error);
            return false
        })
}