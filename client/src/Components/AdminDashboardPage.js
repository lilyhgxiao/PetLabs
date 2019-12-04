import React from 'react';
import { Redirect } from 'react-router';
import '../CSS/AdminDashboardStyles.css';
import ImageComponent from './ImageComponent';
import AdminSideMenu from './AdminSideMenu';

// Images
import users from '../Images/users.png';
import pets from '../Images/pets.png';
import items from '../Images/items.png';

//statezero
import BaseReactComponent from "./../BaseReactComponent";
import {setLastPage} from "../actions/userhelpers"

class AdminDashboard extends BaseReactComponent {
    filterState({currUser}) {
        return {currUser};
    }

    componentDidMount() {
        setLastPage("/AdminDashboardPage");
    }

    render() {
        const currUser = this.state.currUser;

        if (this.state.currUser === null) {
            return(
                <Redirect push to={{
                    pathname: "/"
                }} />
            );
        }

        return(
            <div>
                <AdminSideMenu/>
    
                <div className='main'>
                    <div className='mainForm'>
                        <span className='welcomeTitle'>Welcome, {currUser.username}</span>
                        <p className='description'>View Data For:</p>
                        <ul className='container'>
                            <li>
                                <ImageComponent imgURL={users} altText={'Users'} subtitle={'Users'} link={'./AdminUserListPage'} />
                            </li>
                            <li>
                                <ImageComponent imgURL={pets} altText={'Pets'} subtitle={'Pets'} link={'./AdminPetListPage'} />
                            </li>
                            <li>
                                <ImageComponent imgURL={items} altText={'Items'} subtitle={'Items'} link={'./AdminItemListPage'} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default AdminDashboard;