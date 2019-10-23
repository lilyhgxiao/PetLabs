import React from 'react';

import { uid } from 'react-uid';
import Lists from '../TempClasses/List'
import User from "../TempClasses/User";

import '../CSS/UserDashboardStyles.css';

import UserSideMenu from './UserSideMenu';
import PetComponent from './PetComponent';
import ImageComponent from './ImageComponent';

import addNew from '../Images/add_new.png';

class UserDashboardPage extends React.Component {
    state = {
        user: new User('', '', false)
    };

    componentDidMount() { // When the component enters the DOM
        const currUser = this.props.location.state.user;
        console.log("componentDidMount(): " + currUser.username)
        this.setState({
            user: currUser
        }, this.fetchPets)
    }

    fetchPets = () => { //Fetching data for the pets from the username
        const currUser = this.state.user
        console.log("fetchPets(): " + currUser.username)

        //fetch data from database depending on user
        const totalPetList = Lists.petList;
        const userPetList = [];

        for (let i = 0; i < totalPetList.length; i ++) {
            if (currUser.username === totalPetList[i].owner) {
                userPetList.push(totalPetList[i]);
            }
        }
        currUser.petList = userPetList;
        this.setState({
            user: currUser
        })
    }

    render() {
        return(
            <div>
                <UserSideMenu/>

                <div className='main'>
                    <div className='mainForm'>
                        <h1>Welcome, {this.state.user.username}</h1>
                        <span className='description'>Visit your pets today:</span>
                        <br />
                        <br />
                        <ul className='container'>
                        { this.state.user.petList.map((pet) => {
                            return(
                                <PetComponent className='pets' key={ uid(pet) /*unique id required to help React render more efficiently when we delete pets.*/ } 
                                pet={pet}
                                petPage='#'  />
                                )
                            })
                        }
                        <div className='addNew'>
                            <ImageComponent imgURL={addNew} altText={'Add New Pet'} subtitle={"Add New"} link={'#'} />
                        </div>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDashboardPage;