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

    petReceived = this.props.location.state.pet;

    state = {
        petName: "",
        petImg: petNeutral,
        fullness: 50,
        happiness: 50,
        intelligence: 0,
        strength: 0,
        speed: 0,
        alive: true
    }

    componentDidMount() {
        this.findPet()
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
            petOwner: this.petReceived.owner,
            petImg: petNeutral,
            fullness: this.petReceived.hunger,
            happiness: this.petReceived.happiness,
            intelligence: this.petReceived.intelligence,
            strength: this.petReceived.strength,
            speed: this.petReceived.speed,
            alive: this.petReceived.alive
        })
    }

    starve() {
        // console.log(mockDB.petList[0])
        // console.log(this.state)
        if (this.state.alive) {
            this.setState({
                fullness: this.state.fullness - 2
            })
            this.petReceived.hunger -= 2
            this.fatigue()
        }
    }

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
        }
    }

    // Function related to feeding.
    trainPet = () => {
        if (this.state.alive) {
            log('training pet: +1 all stats');
            this.setState({
                fullness: this.state.fullness - 6,
                intelligence: this.state.intelligence + 1,
                strength: this.state.strength + 1,
                speed: this.state.speed + 1
            })
            this.petReceived.hunger -= 6
            this.petReceived.intelligence += 1
            this.petReceived.strength += 1
            this.petReceived.speed += 1
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
                        numFullness = {this.state.fullness}
                        numHappiness = {this.state.happiness}
                        numIntelligence = {this.state.intelligence}
                        numStrength = {this.state.strength}
                        numSpeed = {this.state.speed}
                    />
                    
                    { /* Shows model of the pet with name */ }  
                    <PetModel
                        imgSource = {this.state.petImg}
                        petName = {this.state.petName}
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