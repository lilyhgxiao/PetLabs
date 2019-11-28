import React from 'react';

import type_default from '../Images/pet_creation_default.png';
import { Redirect } from 'react-router';
import { uid } from 'react-uid';

import '../CSS/CreatePetStyle.css';

import UserSideMenu from './UserSideMenu';
import GoldDisplay from './GoldDisplay.js';
import PetTypeComponent from './PetTypeComponent';
import Database from '../TempClasses/Database';
import Pet from '../TempClasses/Pet';

//statezero
import BaseReactComponent from "./../BaseReactComponent";
import { updateUserState } from "../actions/userhelpers"

class UserCreatePetPage extends BaseReactComponent {

    state = {
        name: "",
        petType: null,
        creationSuccess: false,
        imgURL: type_default,
        typeSelected: false,
        priceString: ""
    };

    filterState({ currUser }) {
        return { currUser };
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
        const newPet = new Pet(this.state.name, currUser.username, this.state.petType.name);

        const petIdListCopy = currUser.petIdList.slice()
        petIdListCopy.push(newPet.id)
        return updateUserState({
            gold: this.state.currUser.gold - this.state.petType.price,
            petIdList: petIdListCopy}
        );

        //const username = currUser.username;
/*         const userList = Database.userList;
        
        for (let i = 0; i < userList.length; i ++) {
            if (Database.currUser.username === userList[i].username) {
                userList[i].petIdList.push(newPet.id)
            }
        } */
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
                const creationSuccess = this.createPet();
                if (!creationSuccess) {
                    alert("An error occurred while creating the pet. Please try again.")
                }
                
                this.setState({
                    creationSuccess: creationSuccess
                });
            }
        }
    }


    selectPet = (petType) => {
        this.setState({
            petType: petType,
            typeSelected: true,
            imgURL: petType.happyImage,
            priceString: " (" + petType.price + "G)"
        })
    }

    render() {
        if (this.state.creationSuccess) {
            return(
                <Redirect push to={{
                    pathname: "/UserDashboardPage",
                    state: { user: this.state.user }
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
                        { Database.petTypes.map((petType) => {
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