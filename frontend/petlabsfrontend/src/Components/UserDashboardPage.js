import React from 'react';

import UserSideMenu from './UserSideMenu';

class UserDashboardPage extends React.Component {
    state = {
        user: -1
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
                            
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

/*
{ this.state.pets.map((pet) => {
                            return(
                                <Pet key={ uid(pet) unique id required to help React render more efficiently when we delete students. } 
                                pet={ pet }  />
                                )
                                }) }
*/

export default UserDashboardPage;