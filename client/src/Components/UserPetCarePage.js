import React from 'react';

import '../CSS/UserPetCareStyles.css';
import PetCareAction from './PetCareComponents/PetCareAction.js';
import PetModel from './PetCareComponents/PetModel.js';
import PetStatus from './PetCareComponents/PetStatus.js';
import UserSideMenu from './UserSideMenu';
import GoldDisplay from './GoldDisplay.js';

import PetImageImporter from './PetImageImporter.js';

//statezero
import BaseReactComponent from "./../BaseReactComponent";
import { updateUserState, setLastPet } from "../actions/userhelpers"
import { updatePetState, deletePet } from '../actions/pethelpers';
import { getPetType } from '../actions/pettypehelpers';
import { getAllItems } from '../actions/itemhelpers';
import { setLastPage } from '../actions/userhelpers';

import { Redirect } from 'react-router';

const log = console.log

class UserPetCarePage extends BaseReactComponent {

    _mounted = false;
    deleting = false;
    ownerItems = [];

    state = {
        petImg: '',
        itemSelected: "No item",
        type: null,
        deleted: false
    }

    filterState({ currUser, currPet }) {
        return { currUser, currPet };
    }

    /* Automatically loaded functions */

    componentDidMount() {
        this._mounted = true;
        this.deleting = false;

        this.dTimer = setInterval(
            () => this.starve(),
        1000
      );
      setLastPage("/UserPetCarePage")
      if (this.state.currPet) {
        setLastPet(this.state.currPet._id)
        this.findPet()
        this.populateItem()
        this.selectItem = this.selectItem.bind(this)
      }
    }
  
    componentWillUnmount() {
        if (this._mounted) {
            clearInterval(this.dTimer)
            this._mounted = false;
        }
    }

    // Find specific pet from the database:
    findPet() {
        const typePromise = getPetType(this.state.currPet.type);

        typePromise.then((type) => {
            this.setState({
                petImg: type.neutralImage, 
                type: type,
            }, this.setPetMood)
        })
    }

    // Use DOM to populate items in the drop down menu:
    populateItem() {
        let itemDropDown = document.querySelector("#dropdown");
        let iList = this.state.currUser.itemIdList;

        const itemsPromise = getAllItems();

        itemsPromise.then((items) => {
            if (items === null) {
                console.log("Error: itemhelpers/getAllItems returned null.")
            }
            else {
                for (let j = 0; j < iList.length; j++) {
                    let iName;
                    for (let k = 0; k < items.length; k++) {
                        if (items[k]._id === iList[j]) {
                            iName = items[k].name;
                            this.ownerItems.push(items[k])
                        }
                    }
                    let entryText = document.createTextNode(iName)
        
                    let itemEntry = document.createElement('option')
                    itemEntry.setAttribute("value", iList[j])
        
                    itemEntry.appendChild(entryText)
                    itemDropDown.appendChild(itemEntry)
                }
            }
        })
    }

    starve() {
        if (this.state.currPet.alive && this.deleting === false) {
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
                petImg: 'pet_dead'
            })
        }
    }

    // Function related to use of item.
    trainPet = () => {
        const currPet = this.state.currPet

        if (currPet.alive && this.state.itemSelected !== "No item") {

            // Find item:
            let targetItem;
            for (let k = 0; k < this.ownerItems.length; k++) {
                if (this.ownerItems[k]._id === this.state.itemSelected) {
                    targetItem = this.ownerItems[k];
                }
            }

            this.updateHappiness(targetItem.happiness)
            this.updateFullness(targetItem.fullness)

            updatePetState({
                intelligence: currPet.intelligence + targetItem.intelligence * this.state.type.intelligenceRate,
                strength: currPet.strength + targetItem.strength * this.state.type.strengthRate,
                speed: currPet.speed + targetItem.speed * this.state.type.speedRate
            }, currPet._id)
            this.fatigue()
        } 
    }

    /* Gameplay helper functions */

    fatigue() {
        const currPet = this.state.currPet;
        if (currPet.fullness < 20) {
            this.updateHappiness(-5);
        } 
        if (currPet.fullness === 0 && currPet.happiness === 0) {
            updatePetState({alive: false}, currPet._id);
            this.setState({
                petImg: 'pet_dead'
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

        updatePetState({happiness: currPet.happiness + incValue}, currPet._id);
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

        updatePetState({fullness: currPet.fullness + incValue}, currPet._id)
    }

    giveGold() {
        const currUser = this.state.currUser;
        updateUserState({gold: currUser.gold + 20}, currUser._id)
    }

    selectItem(e) {
        this.setState({
            itemSelected: e.target.value
        })
    }

    deletePet = () => {
        const currPet = this.state.currPet;
        this.deleting = true;

        const confirmDelete = window.confirm("Say goodbye to " + currPet.petName + "? (You cannot undo this action!)")
        if (confirmDelete) {
            const deleteReq = deletePet(currPet._id);
            
            deleteReq.then((result) => {
                this.setState({
                    deleted: result
                })
            })
        }
    }

    render() {
        const { currUser, currPet } = this.state;

        if (this.state.currUser === null) {
            return(
                <Redirect push to={{
                    pathname: "/"
                }} />
            );
        }

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
                                imgSource = {PetImageImporter.get(this.state.petImg)}
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