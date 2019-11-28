import React from 'react';

import '../CSS/UserPetCareStyles.css';
import PetCareAction from './PetCareComponents/PetCareAction.js';
import PetModel from './PetCareComponents/PetModel.js';
import PetStatus from './PetCareComponents/PetStatus.js';
import UserSideMenu from './UserSideMenu';
import GoldDisplay from './GoldDisplay.js';

import mockDB from '../TempClasses/Database';
import pet_dead from '../Images/pet_dead.png';

//statezero
import BaseReactComponent from "./../BaseReactComponent";
import { updateUserState } from "../actions/userhelpers"

import { Redirect } from 'react-router';
import { updatePetState } from '../actions/pethelpers';

const log = console.log

class UserPetCarePage extends BaseReactComponent {

    state = {
        petImg: '',
        itemSelected: -99,
        type: null,
        deleted: false,
        currUser: null,
        currPet: null
    }

    filterState({ currUser, currPet }) {
        return { currUser, currPet };
    }

    /* Automatically loaded functions */

    componentDidMount() {
        this.findPet()
        this.populateItem()
        this.selectItem = this.selectItem.bind(this)

        this.dTimer = setInterval(
            () => this.starve(),
        1000
      );
    }
  
    componentWillUnmount() {
        clearInterval(this.dTimer)
    }

    // Find specific pet from the database:
    findPet() {
        const type = this.retrieveType();
        console.log(type)
        this.setState({
            petImg: type.neutralImage,
            type: type
        }, this.setPetMood)
    }

    retrieveType = () => {
        const typesList = mockDB.petTypes;
        for (let i = 0; i < typesList.length; i++) {
            if (typesList[i].name === this.state.currPet.type) {
                return typesList[i];
            }
        }
    }

    // Use DOM to populate items in the drop down menu:
    populateItem() {
        let itemDropDown = document.querySelector("#dropdown");
        let iList = this.state.currUser.itemIdList;

        for (let j = 0; j < iList.length; j++) {
            let iName;
            for (let k = 0; k < mockDB.itemList.length; k++) {
                if (mockDB.itemList[k].id === iList[j]) {
                    iName = mockDB.itemList[k].name;
                }
            }
            let entryText = document.createTextNode(iName)

            let itemEntry = document.createElement('option')
            itemEntry.setAttribute("value", iList[j])

            itemEntry.appendChild(entryText)
            itemDropDown.appendChild(itemEntry)
        }
    }

    starve() {
        if (this.state.currPet.alive) {
            this.updateFullness(-2)
            this.fatigue()
        }
    }

    /* Actual gameplay functions */

    // Function related to feeding.
    feedPet = () => {
        log('feeding: -10 hunger');
        if (this.state.currPet.alive) {
            this.updateFullness(10);
        }
    }

    // Function related to feeding.
    playWithPet = () => {
        log('playing with pet: +3 happiness');

        const currPet = this.state.currPet
        if (currPet.alive) {

            let incValue = 3;
            if (currPet.fullness >= 20) {
                incValue = 3;
            } else if (currPet.fullness < 20) {
                incValue = 1;
            }

            this.updateHappiness(incValue)

            this.giveGold();
        }
    }

    setPetMood = () => {
        const currPet = this.state.currPet

        if (currPet.alive) {
            if (currPet.happiness >= 30 && currPet.happiness < 80) {
                this.setState({
                    petImg: this.state.type.neutralImage
                })
            } else if (currPet.happiness >= 80) {
                this.setState({
                    petImg: this.state.type.happyImage
                })
            } else if (currPet.happiness < 30) {
                this.setState({
                    petImg: this.state.type.sadImage
                })
            }
        } else {
            this.setState({
                petImg: pet_dead
            })
        }
        
    }

    // Function related to use of item.
    trainPet = () => {
        const currPet = this.state.currPet

        if (currPet.alive && this.state.itemSelected > -99) {

            // Find item:
            let targetItem;
            for (let k = 0; k < mockDB.itemList.length; k++) {
                if (mockDB.itemList[k].id === this.state.itemSelected) {
                    targetItem = mockDB.itemList[k];
                }
            }

            this.updateHappiness(targetItem.fullness)
            this.updateFullness(targetItem.happiness)

            updatePetState({
                intelligence: currPet.intelligence + targetItem.intelligence * this.state.type.intelligenceRate,
                strength: currPet.strength + targetItem.strength * this.state.type.strengthRate,
                speed: currPet.speed + targetItem.speed * this.state.type.speedRate
            })
            this.fatigue()
        } 
    }

    /* Gameplay helper functions */

    fatigue() {
        const currPet = this.state.currPet;
        if (currPet.fullness < 20) {
            this.updateHappiness(-5);
        } 
        if (currPet.fullness === 0 && this.state.happiness === 0) {
            updatePetState({alive: false});
            this.setState({
                petImg: pet_dead
            });
        }
    }

    updateHappiness = (incValue) => {
        const currPet = this.state.currPet

        if (currPet.happiness + incValue * this.state.type.happinessRate > 100) {
            incValue = 100 - currPet.happiness
        } else if (currPet.happiness + incValue * this.state.type.happinessRate < 0) {
            incValue = (-1) * currPet.happiness
        } else {
            incValue = incValue * this.state.type.happinessRate
        }

        updatePetState({happiness: currPet.happiness + incValue});
        this.setPetMood();
    }

    updateFullness = (incValue) => {
        const currPet = this.state.currPet;

        if (currPet.fullness + incValue * this.state.type.fullnessRate > 100) {
            incValue = 100 - currPet.fullness
        } else if (currPet.fullness + incValue * this.state.type.fullnessRate < 0) {
            incValue = (-1 ) * currPet.fullness
        } else {
            incValue = incValue * this.state.type.fullnessRate
        }
        updatePetState({fullness: currPet.fullness + incValue})
    }

    giveGold() {
        const currUser = this.state.currUser;
        updateUserState({gold: currUser.gold + 20})
    }

    selectItem(e) {
        this.setState({
            itemSelected: parseInt(e.target.value)
        })
    }

    deletePet = () => {
        const currPet = this.state.currPet;
        const currUser = this.state.currUser;

        const confirmDelete = window.confirm("Say goodbye to " + currPet.petName + "? (You cannot undo this action!)")
        if (confirmDelete) {
            const petListIdx = mockDB.petList.indexOf(currPet);
            const userPetListIdx = currUser.petIdList.indexOf(currPet.id);

            mockDB.petList.splice(petListIdx, 1);
            currUser.petIdList.splice(userPetListIdx, 1);
            this.setState({
                deleted: true
            })
        }
    }

    render() {
        const { currUser, currPet } = this.state;

        if (this.state.deleted) {
            return(
                <Redirect push to={{
                    pathname: "/UserDashboardPage"
                }} />
            );
        }

        return (
            <div>
                <UserSideMenu/>
                <GoldDisplay gold={ currUser.gold }/>
                <div className='main'>
                    <span className='careTitle'>Care for your pet!</span><br/>
                    <div className='showPetContainer'>
                        <div className='showPet'>
                            { /* Shows status of the pet */ }  
                            <PetStatus
                                numFullness = {currPet.fullness}
                                numHappiness = {currPet.happiness}
                                numIntelligence = {currPet.intelligence}
                                numStrength = {currPet.strength}
                                numSpeed = {currPet.speed}
                                petName = {currPet.petName}
                            />
                            
                            { /* Shows model of the pet with name */ }  
                            <PetModel
                                imgSource = {this.state.petImg}
                            />
                        </div>
                    </div>
                    { /* A table that contains three buttons */ }  
                    <PetCareAction
                        feedAction = {this.feedPet}
                        playAction = {this.playWithPet}
                        trainAction = {this.trainPet}
                        dropdownAction = {this.selectItem}
                    />
                    <button className='deleteButton' onClick={ this.deletePet }>Say Goodbye</button>
                </div>
            </div>
        );  
    }
}

export default UserPetCarePage;