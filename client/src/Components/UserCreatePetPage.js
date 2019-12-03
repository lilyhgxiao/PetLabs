import React from 'react';

import type_default from '../Images/pet_creation_default.png';
import { Redirect } from 'react-router';
import { uid } from 'react-uid';

import '../CSS/CreatePetStyle.css';

import UserSideMenu from './UserSideMenu';
import GoldDisplay from './GoldDisplay.js';
import PetTypeComponent from './PetTypeComponent';

import PetImageImporter from './PetImageImporter.js';

//statezero
import BaseReactComponent from "./../BaseReactComponent";
import { updateUserState } from "../actions/userhelpers"
import { getAllPetTypes } from "../actions/pettypehelpers"
import { createNewPet } from "../actions/pethelpers"
import { setLastPage } from '../actions/userhelpers';

class UserCreatePetPage extends BaseReactComponent {

    state = {
        name: "",
        petType: null,
        creationSuccess: false,
        imgURL: type_default,
        typeSelected: false,
        priceString: "",
        petTypeList: []
    };

    filterState({ currUser }) {
        return { currUser };
    }

    componentDidMount() { // When the component enters the DOM
        this.fetchTypes();
        setLastPage("/UserCreatePetPage")
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        // 'this' is bound to the component in this arrow function.
        this.setState({
          [name]: value  // [name] sets the object property name to the value of the 'name' variable.
        });
    }

    fetchTypes = () => {
        const petListReq = getAllPetTypes();

        petListReq.then((pettypes) => {
            const petTypeList = [];
            let petTypeToAdd;
            for (const petType of pettypes) {
                petTypeToAdd = {
                    _id: petType._id,
                    name: petType.name,
                    happinessRate: petType.happinessRate,
                    fullnessRate: petType.fullnessRate,
                    strengthRate: petType.strengthRate,
                    intelligenceRate: petType.intelligenceRate,
                    speedRate: petType.speedRate,
                    price: petType.price,
                    happyImage: petType.happyImage
                };
                petTypeList.push(petTypeToAdd);
            }
            this.setState({
                petTypeList: petTypeList
            });
        }).catch((error) => {
            console.log(error);
        })
    }

    authGold = () => {
        if (this.state.currUser.gold < this.state.petType.price) {
            return false;
        }
        else {
            return true;
        }
    }

    createPet = () => {
        const currUser = this.state.currUser;
        const newPet = {
            ownerName: currUser.username,
            petName: this.state.name,
            type: this.state.petType.name
        };

        const petReq = createNewPet(newPet);

        return petReq.then((pet) => {
            const petIdListCopy = currUser.petIdList.slice();
            petIdListCopy.push(pet._id);
            const updateReq = updateUserState({
                gold: this.state.currUser.gold - this.state.petType.price,
                petIdList: petIdListCopy}
            , currUser._id);

            return updateReq.then((result) => {
                return result;
            })
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }

    authEmpty = () => {
        if (this.state.name.length === 0) {
            return false;
        }
        return true;
    }

    tryCreate = () => {
        let success = true;
        if (this.state.petType === null) {
            alert("Please select a pet type.");
        }
        else {
            if (!this.authEmpty()) {
                alert("Please enter a name.");
                success = false;
            }
            if (!this.authGold()) {
                alert("Not enough gold to purchase this pet.");
                success = false;
            }
    
            if (success) {
                const creationReq = this.createPet();
                creationReq.then((result) => {
                    if (!result) {
                        alert("An error occurred while creating the pet. Please try again.")
                    }
                    
                    this.setState({
                        creationSuccess: result
                    });
                })
            }
        }
    }


    selectPet = (petType) => {
        this.setState({
            petType: petType,
            typeSelected: true,
            imgURL: PetImageImporter.get(petType.happyImage),
            priceString: " (" + petType.price + "G)"
        })
    }

    render() {

        if (this.state.currUser === null) {
            return(
                <Redirect push to={{
                    pathname: "/"
                }} />
            );
        }

        if (this.state.creationSuccess) {
            return(
                <Redirect push to={{
                    pathname: "/UserDashboardPage"
                }} />
            );
        }

        return(
            <div>
                <UserSideMenu/>
                <GoldDisplay gold={ this.state.currUser.gold }/>

                <div className='main'>
                    
                    <div className='mainForm'>
                        <span className="newTitle">A New Friend!</span>
                        <br />
                        <div className="selectedPurchase">
                            <img className="selectedPet" src={this.state.imgURL} alt="Selected Type"/>
                            <br/>
                            <span className="selectedName">{this.state.name}</span>
                        </div>
                        
                        <ul className='container'>
                        { this.state.petTypeList.map((petType) => {
                            return(
                                <PetTypeComponent className='petTypes' key={ uid(petType) }
                                petType={petType}
                                selectPet={this.selectPet}  />
                                )
                            })
                        }
                        </ul>
                        <span id="newName">Name:</span>
                        <input id="newNameInput" name='name' 
                            value={ this.state.name } 
                            onChange={this.handleInputChange} 
                            type="text" 
                            placeholder="Name" />
                        <br/>
                        <button className="createButton" onClick={this.tryCreate}>Bring home!{this.state.priceString}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCreatePetPage;