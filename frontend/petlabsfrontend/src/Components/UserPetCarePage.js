import React from 'react';
// import '../CSS/__.css';
import PetCareAction from './PetCareAction.js';
import PetModel from './PetModel.js';

// Images
import petHappy from '../Images/pet_happy_placeholder.png';
import petNeutral from '../Images/pet_neutral_placeholder.png';
import petSad from '../Images/pet_sad_placeholder.png';

class UserPetCarePage extends React.Component {

    state = {
        petName: "pet A",
        petImg: petNeutral,
        hunger: 50,
        happiness: 50,
        intelligence: 0,
        strength: 0,
        speed: 0,
        alive: true
    }

    componentDidMount() {
        this.dTimer = setInterval(
            () => this.starve(),
        1000
      );
    }
  
    componentWillUnmount() {
        clearInterval(this.dTimer)
    }

    starve() {
        if (this.state.alive) {
            this.setState({
                hunger: this.state.hunger + 2
            })
            this.fatigue()
        }
    }

    fatigue() {
        if (this.state.hunger > 90) {
            this.setState({
                happiness: this.state.happiness - 2
            })
            if (this.state.happiness < 20) {
                this.setState({
                    petImg: petSad
                })
            }
        } else if (this.state.hunger > 160) {
            this.setState({
                alive: false
            })
        }
    }

    // Function related to feeding.
    feedPet = () => {
        log('feeding: -10 hunger');
        if (this.state.alive) {
            this.setState({
                hunger: this.state.hunger - 10
            })
        }
    }

    // Function related to feeding.
    playWithPet = () => {
        log('playing with pet: +2 happiness');
        if (this.state.alive) {

            incValue = 2;
            if (this.state.hunger > 90) {
                incValue = 1;
            } else if (this.state.hunger > 120) {
                incValue = 0;
            }

            this.setState({
                happiness: this.state.happiness + incValue
            })
            
            if (this.state.happiness > 60) {
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
                hunger: this.state.hunger + 6,
                intelligence: this.state.intelligence + 1,
                strength: this.state.strength + 1,
                speed: this.state.speed + 1
            })
            this.fatigue()
        } 
    }

    render() {
        return (
            <div>
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
        );  
      }

}

export default UserPetCarePage;