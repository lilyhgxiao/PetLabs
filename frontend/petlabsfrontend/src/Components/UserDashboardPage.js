import React from 'react';

import { uid } from 'react-uid';
import { Redirect } from 'react-router';

import Database from '../TempClasses/Database'
import User from "../TempClasses/User";

import '../CSS/UserDashboardStyles.css';

import UserSideMenu from './UserSideMenu';
import PetComponent from './PetComponent';

import addNew from '../Images/add_new.png';

class UserDashboardPage extends React.Component {
    state = {
        user: new User('', '', false),
        toPetPage: false,
        targetPet: null,
        toCreate: false
    };

    componentDidMount() { // When the component enters the DOM
        const currUser = Database.currUser;
        this.setState({
            user: currUser,
            toPetPage: false,
            targetPet: null,
            toCreate: false
        }, this.fetchPets)
    }

    fetchPets = () => { //Fetching data for the pets from the username
        const currUser = this.state.user

        //fetch data from database depending on user
        const totalPetList = Database.petList;
        const userPetList = [];

        for (let i = 0; i < totalPetList.length; i ++) {
            if (currUser.username === totalPetList[i].ownerName) {
                userPetList.push(totalPetList[i]);
            }
        }
        currUser.petList = userPetList;
        this.setState({
            user: currUser
        })
    }

    goToPetPage = (pet) => {
        this.setState({
            targetPet: pet,
            toPetPage: true
        })
    }

    goToCreate = () => {
        console.log("create")
        this.setState({
            toCreate: true
        })
    }

    render() {
        if (this.state.toPetPage) {
            return(
                <Redirect push to={{
                    pathname: "/UserPetCarePage",
                    state: { pet: this.state.targetPet }
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

                <div className='main'>
                    <div className='mainForm'>
                        <span className='welcomeTitle'>Welcome, {this.state.user.username}</span>
                        <br/>
                        <span className='description'>Visit your pets today:</span>
                        <br />
                        <br />
                        <ul className='container'>
                        { this.state.user.petList.map((pet) => {
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