import React from 'react';

import '../CSS/UserPetCareStyles.css';
import PetCareAction from './PetCareComponents/PetCareAction.js';
import PetModel from './PetCareComponents/PetModel.js';
import PetStatus from './PetCareComponents/PetStatus.js';
import UserSideMenu from './UserSideMenu';
import GoldDisplay from './GoldDisplay.js';

import Pet from '../TempClasses/Pet';
import mockDB from '../TempClasses/Database';

import petHappy from '../Images/pet_happy_placeholder.png';
import petNeutral from '../Images/pet_neutral_placeholder.png';
import petSad from '../Images/pet_sad_placeholder.png';

const log = console.log

class UserPetCarePage extends React.Component {

    petReceived = this.props.location.state.pet;

    state = {
        userGold: 0,
        petName: "",
        petImg: petNeutral,
        fullness: 50,
        happiness: 50,
        intelligence: 0,
        strength: 0,
        speed: 0,
        alive: true,
        itemSelected: -99
    }

    /* Automatically loaded functions */

    componentDidMount() {
        this.setState({
            userGold: mockDB.currUser.gold
        })
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
        this.setState({
            petName: this.petReceived.petName,
            petImg: petNeutral,
            fullness: this.petReceived.hunger,
            happiness: this.petReceived.happiness,
            intelligence: this.petReceived.intelligence,
            strength: this.petReceived.strength,
            speed: this.petReceived.speed,
            alive: this.petReceived.alive
        })
    }

    // Use DOM to populate items in the drop down menu:
    populateItem() {
        let uList = mockDB.userList;
        let i = 0;
        while (i < uList.length) {
            if (uList[i].username == this.petReceived.ownerName) {

                let itemDropDown = document.querySelector("#dropdown");
                let iList = uList[i].itemIdList;

                for (let j = 0; j < iList.length; j++) {
                    let iName;
                    for (let k = 0; k < mockDB.itemList.length; k++) {
                        if (mockDB.itemList[k].id == iList[j]) {
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
            i++;
        }
    }

    starve() {
        if (this.state.alive) {
            this.setState({
                fullness: this.state.fullness - 2
            })
            this.petReceived.hunger -= 2
            this.fatigue()
        }
    }

    /* Actual gameplay functions */

    // Function related to feeding.
    feedPet = () => {
        log('feeding: -10 hunger');
        if (this.state.alive) {
            this.setState({
                fullness: this.state.fullness + 10
            })
            this.petReceived.hunger += 10
        }
    }

    // Function related to feeding.
    playWithPet = () => {
        log('playing with pet: +2 happiness');
        if (this.state.alive) {

            let incValue = 2;
            if (this.state.fullness < 20 && this.state.fullness >= -20) {
                incValue = 1;
            } else if (this.state.fullness < -20) {
                incValue = 0;
            }

            this.setState({
                happiness: this.state.happiness + incValue
            })
            this.petReceived.happiness += incValue
            
            if (this.state.happiness > 60 && this.state.happiness <= 90) {
                this.setState({
                    petImg: petNeutral
                })
            } else if (this.state.happiness > 90) {
                this.setState({
                    petImg: petHappy
                })
            }

            this.giveGold();
        }
    }

    // Function related to use of item.
    trainPet = () => {
        if (this.state.alive && this.state.itemSelected > -99) {

            // Find item:
            let targetItem;
            for (let k = 0; k < mockDB.itemList.length; k++) {
                if (mockDB.itemList[k].id == this.state.itemSelected) {
                    targetItem = mockDB.itemList[k];
                }
            }

            this.setState({
                fullness: this.state.fullness + targetItem.fullness,
                happiness: this.state.happiness + targetItem.happiness,
                intelligence: this.state.intelligence + targetItem.intelligence,
                strength: this.state.strength + targetItem.strength,
                speed: this.state.speed + targetItem.speed
            })
            this.petReceived.hunger += targetItem.fullness
            this.petReceived.happiness += targetItem.happiness
            this.petReceived.intelligence += targetItem.intelligence
            this.petReceived.strength += targetItem.strength
            this.petReceived.speed += targetItem.speed
            this.fatigue()
        } 
    }

    /* Gameplay helper functions */

    fatigue() {
        if (this.state.fullness < 20 && this.state.fullness >= -20) {
            this.setState({
                happiness: this.state.happiness - 20
            })
            this.petReceived.happiness -= 20
            if (this.state.happiness < 20) {
                this.setState({
                    petImg: petSad
                })
            }
        } if (this.state.fullness < -20) {
            this.setState({
                alive: false
            })
            this.petReceived.alive = false
        }
    }

    giveGold() {
        mockDB.currUser.gold += 20;
        this.setState({
            userGold: mockDB.currUser.gold
        })
    }

    selectItem(e) {
        this.setState({
            itemSelected: e.target.value
        })
    }

    render() {
        return (
            <div>
                <UserSideMenu/>
                <div className='main'>
                    <GoldDisplay gold={ this.state.userGold }/>
                    <div className='showPetContainer'>
                        <div className='showPet'>
                            { /* Shows status of the pet */ }  
                            <PetStatus
                                numFullness = {this.state.fullness}
                                numHappiness = {this.state.happiness}
                                numIntelligence = {this.state.intelligence}
                                numStrength = {this.state.strength}
                                numSpeed = {this.state.speed}
                                petName = {this.state.petName}
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
                </div>
            </div>
        );  
    }
}

export default UserPetCarePage;