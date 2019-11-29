import { setState, convertJSON } from "./helpers";
import { getState } from "statezero";
import { getUserByUsername, updateUserState, changeUser } from "./userhelpers"

//temp, delete later
import Database from '../TempClasses/Database';

//temp, delete later
const changePetState = (pet) => {
    for (let i = 0; i < Database.petList.length; i++) {
        if (Database.petList[i].id === pet.id) {
            Database.petList[i] = pet;
            break;
        }
    }
}


export const setTargetPet = (pet) => {
    setState("currPet", pet);
}

export const updatePetState = (state, targetPetId) => {
    //DB CALL: UPDATE PET
    const url = "http://localhost:3001/pets/" + targetPetId;

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
                console.log("updatePetState changed DB", targetPetId)

                //if it succeeds, and targetPetId === currPet call:
                const currPet = getState("currPet");
                if (currPet.id === targetPetId) {
                    for (const property in state) {
                        setState(`currPet.${property}`, state[property])
                    }
                    changePetState(getState("currPet")); //delete later
                }
            }
        }).catch((error) => {
            console.log(error);
        })
    
    return true
}


export const getAllPets = () => {
    const url = "http://localhost:3001/pets";
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
        }).then((pets) => {
            return pets;
        }).catch((error) => {
            console.log(error);
        });
}


export const deletePet = (targetPetId) => {
    //DB CALL: DELETE PET
    const url = "http://localhost:3001/pets/" + targetPetId;

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
                console.log("deletePet changed DB", targetPetId)
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

                const currPet = getState("currPet");

                //delete later
                const petListIdx = Database.petList.indexOf(currPet);
                Database.petList.splice(petListIdx, 1); 

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