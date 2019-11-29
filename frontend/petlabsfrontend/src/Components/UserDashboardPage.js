import React from 'react';

import { uid } from 'react-uid';
import { Redirect } from 'react-router';

import Database from '../TempClasses/Database'

import '../CSS/UserDashboardStyles.css';

import UserSideMenu from './UserSideMenu';
import PetComponent from './PetComponent';
import GoldDisplay from './GoldDisplay.js';

//statezero
import BaseReactComponent from "./../BaseReactComponent";
import { setTargetPet } from "../actions/pethelpers";

import addNew from '../Images/add_new.png';

class UserDashboardPage extends BaseReactComponent {
    
    state = {
        toPetPage: false,
        petList: [],
        toCreate: false,
        currUser: null,
        currPet: null
    };

    filterState({ currUser, currPet }) {
        return { currUser, currPet };
    }

    componentDidMount() { // When the component enters the DOM
        this.setState({
            toPetPage: false,
            toCreate: false,
            currPet: null
        }, this.fetchPets)
    }

    fetchPets = () => { //Fetching data for the pets from the username
        const currUser = this.state.currUser

        const petList = []
        const totalPetList = Database.petList;

        for (const petId of currUser.petIdList) {
            petList.push(totalPetList.filter(pet => pet['id'] === petId)[0])
        }

        console.log(petList)

        this.setState({
            petList: petList
        });
    }

    goToPetPage = (pet) => {
        setTargetPet(pet);
        this.setState({
            toPetPage: true
        });
    }

    goToCreate = () => {
        console.log("create")
        this.setState({
            toCreate: true
        })
    }

    render() {
        const { currUser } = this.state;

        if (this.state.toPetPage) {
            return(
                <Redirect push to={{
                    pathname: "/UserPetCarePage"
                }} />
            );
        }
        if (this.state.toCreate) {
            return(
                <Redirect push to={{
                    pathname: "/UserCreatePetPage"
                }} />
            );
        }

        return(
            <div>
                <UserSideMenu/>
                <GoldDisplay gold={ currUser.gold }/>
                <div className='main'>
                    
                    <div className='mainForm'>
                        <span className='welcomeTitle'>Welcome, {currUser.username}</span>
                        <br/>
                        <span className='description'>Visit your pets today:</span>
                        <br />
                        <br />
                        <ul className='container'>
                        { this.state.petList.map((pet) => {
                            return(
                                <PetComponent className='pets' key={ uid(pet) /*unique id required to help React render more efficiently when we delete pets.*/ } 
                                pet={pet}
                                goToPetPage={this.goToPetPage}  />
                                )
                            })
                        }
                        <div className='addNew' onClick={this.goToCreate}>
                            <img className='addNewImg' src={addNew} alt={'Add New Pet'}/>
                            <br/>
                            <span id='addNewText'>
                                Add New
                            </span>
                        </div>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDashboardPage;