import React from 'react';

import '../CSS/UserPetCareStyles.css';
import PetCareAction from './PetCareComponents/PetCareAction.js';
import PetModel from './PetCareComponents/PetModel.js';
import PetStatus from './PetCareComponents/PetStatus.js';
import UserSideMenu from './UserSideMenu';
import GoldDisplay from './GoldDisplay.js';

import mockDB from '../TempClasses/Database';

const log = console.log

class UserPetCarePage extends React.Component {

    petReceived = this.props.location.state.pet;

    state = {
        userGold: 0,
        petName: "",
        petImg: '',
        fullness: 50,
        happiness: 50,
        intelligence: 0,
        strength: 0,
        speed: 0,
        alive: true,
        itemSelected: -99,
        type: null
    }

    /* Automatically loaded functions */

    componentDidMount() {
        this.setState({
            userGold: mockDB.currUser.gold
        },this.findPet)
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
            petName: this.petReceived.petName,
            petImg: type.neutralImage,
            fullness: this.petReceived.fullness,
            happiness: this.petReceived.happiness,
            intelligence: this.petReceived.intelligence,
            strength: this.petReceived.strength,
            speed: this.petReceived.speed,
            alive: this.petReceived.alive,
            type: type
        }, this.setPetMood)
    }

    retrieveType = () => {
        const typesList = mockDB.petTypes;
        for (let i = 0; i < typesList.length; i++) {
            if (typesList[i].name === this.petReceived.type) {
                return typesList[i];
            }
        }
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
            this.updateFullness(-2)
            this.fatigue()
        }
    }

    /* Actual gameplay functions */

    // Function related to feeding.
    feedPet = () => {
        log('feeding: -10 hunger');
        if (this.state.alive) {
            this.updateFullness(10);
        }
    }

    // Function related to feeding.
    playWithPet = () => {
        log('playing with pet: +3 happiness');
        if (this.state.alive) {

            let incValue = 3;
            if (this.state.fullness >= 20) {
                incValue = 3;
            } else if (this.state.fullness < 20) {
                incValue = 1;
            }

            this.updateHappiness(incValue)

            this.giveGold();
        }
    }

    setPetMood = () => {
        if (this.state.happiness >= 30 && this.state.happiness < 80) {
            this.setState({
                petImg: this.state.type.neutralImage
            })
        } else if (this.state.happiness >= 80) {
            this.setState({
                petImg: this.state.type.happyImage
            })
        } else if (this.state.happiness < 30) {
            this.setState({
                petImg: this.state.type.sadImage
            })
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

            this.updateHappiness(targetItem.fullness)
            this.updateFullness(targetItem.happiness)

            this.setState({
                intelligence: this.state.intelligence + targetItem.intelligence * this.state.type.intelligenceRate,
                strength: this.state.strength + targetItem.strength * this.state.type.strengthRate,
                speed: this.state.speed + targetItem.speed * this.state.type.speedRate
            })
            this.petReceived.intelligence += targetItem.intelligence * this.state.type.intelligenceRate
            this.petReceived.strength += targetItem.strength * this.state.type.strengthRate
            this.petReceived.speed += targetItem.speed * this.state.type.speedRate
            this.fatigue()
        } 
    }

    /* Gameplay helper functions */

    fatigue() {
        if (this.state.fullness < 20) {
            this.updateHappiness(-5);
        } 
        if (this.state.fullness === 0 && this.state.happiness === 0) {
            this.setState({
                alive: false
            })
            this.petReceived.alive = false
        }
    }

    updateHappiness = (incValue) => {
        if (this.state.happiness + incValue * this.state.type.happinessRate > 100) {
            incValue = 100 - this.state.happiness
        } else if (this.state.happiness + incValue * this.state.type.happinessRate < 0) {
            incValue = this.state.happiness
        } else {
            incValue = incValue * this.state.type.happinessRate
        }
        this.setState({
            happiness: this.state.happiness + incValue
        })
        this.petReceived.happiness += incValue
        this.setPetMood();
    }

    updateFullness = (incValue) => {
        if (this.state.fullness + incValue * this.state.type.fullnessRate > 100) {
            incValue = 100 - this.state.fullness
        } else if (this.state.fullness + incValue * this.state.type.fullnessRate < 0) {
            incValue = this.state.fullness
        } else {
            incValue = incValue * this.state.type.fullnessRate
        }
        this.setState({
            fullness: this.state.fullness + incValue 
        })
        this.petReceived.fullness += incValue
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
                    <span className='careTitle'>Care for your pet!</span><br/>
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