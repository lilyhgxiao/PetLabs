import { setState, setEmptyState } from "./helpers";
import { getState } from "statezero";

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

export const updatePetState = (state) => {
    //DB CALL: UPDATE PET
    //if it succeeds call:
    for (const property in state) {
        setState(`currPet.${property}`, state[property])
    }
    changePetState(getState("currPet"));
    return true
}