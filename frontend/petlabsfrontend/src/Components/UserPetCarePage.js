import React from 'react';

import '../CSS/UserPetCareStyles.css';
import PetCareAction from './PetCareAction.js';
import PetModel from './PetModel.js';
import PetStatus from './PetStatus.js';
import UserSideMenu from './UserSideMenu';

import Pet from '../TempClasses/Pet';
import mockDB from '../TempClasses/Database';

import petHappy from '../Images/pet_happy_placeholder.png';
import petNeutral from '../Images/pet_neutral_placeholder.png';
import petSad from '../Images/pet_sad_placeholder.png';

const log = console.log

class UserPetCarePage extends React.Component {

    state = {
        petObj : [],
        petImg: petNeutral
    }

    componentDidMount() {
        this.findPet()
        this.setStartImage()
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
        const petReceived = this.props.location.state.pet;
        const pList = mockDB.petList;
        let i = 0;
        while (i < pList.length) {
            if (pList[i].petName == petReceived.petName) {
                this.setState({
                    petObj: pList[i]
                })
                i += pList.length;
            } else {
                i++;
            }
        }
    }

    // Set starting image accordingly.          
    setStartImage() {
        if (this.state.petObj.happiness < 20) {
            this.setState({
                petImg: petSad
            })
        } else if (this.state.petObj.happiness > 90) {
            this.setState({
                petImg: petHappy
            })
        }
    }

    starve() {
        if (this.state.petObj.alive) {
            this.state.petObj.hunger -= 2;
            this.fatigue();
        }
    }

    fatigue() {
        if (this.state.petObj.hunger < 20 && this.state.petObj.hunger >= -20) {

            this.state.petObj.happiness -= 20;
            
            if (this.state.petObj.happiness < 20) {
                this.setState({
                    petImg: petSad
                })
            }
        } if (this.state.petObj.hunger< -20) {
            this.state.petObj.alive = false;
        }
    }

    // Function related to feeding.
    feedPet = () => {
        log('feeding: -10 hunger');
        if (this.state.petObj.alive) {
            this.state.petObj.hunger += 10;
        }
    }

    // Function related to feeding.
    playWithPet = () => {
        log('playing with pet: +2 happiness');
        if (this.state.petObj.alive) {

            let incValue = 2;
            if (this.state.petObj.hunger < 20 && this.state.petObj.hunger >= -20) {
                incValue = 1;
            } else if (this.state.petObj.hunger < -20) {
                incValue = 0;
            }

            this.state.petObj.happiness += incValue;
            
            if (this.state.petObj.happiness > 60 && this.state.petObj.happiness <= 90) {
                this.setState({
                    petImg: petNeutral
                })
            } else if (this.state.petObj.happiness > 90) {
                this.setState({
                    petImg: petHappy
                })
            }
        }
    }

    // Function related to feeding.
    trainPet = () => {
        if (this.state.petObj.alive) {
            log('training pet: +1 all stats');
            this.state.petObj.hunger -= 6;
            this.state.petObj.intelligence += 1;
            this.state.petObj.strength += 1;
            this.state.petObj.speed += 1;
            this.fatigue()
        } 
    }

    render() {
        return (
            <div>
                <UserSideMenu/>
                <div className='main'>
                    { /* Shows status of the pet */ }  
                    <PetStatus
                        numFullness = {this.state.petObj.hunger}
                        numHappiness = {this.state.petObj.happiness}
                        numIntelligence = {this.state.petObj.intelligence}
                        numStrength = {this.state.petObj.strength}
                        numSpeed = {this.state.petObj.speed}
                    />
                    
                    { /* Shows model of the pet with name */ }  
                    <PetModel
                        imgSource = {this.state.petImg}
                        petName = {this.state.petObj.petName}
                    />

                    { /* A table that contains three buttons */ }  
                    <PetCareAction
                        feedAction = {this.feedPet}
                        playAction = {this.playWithPet}
                        trainAction = {this.trainPet}
                    />
                </div>
            </div>
        );  
      }
}

export default UserPetCarePage;