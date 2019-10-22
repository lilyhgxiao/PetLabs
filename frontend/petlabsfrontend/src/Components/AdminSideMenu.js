import React from 'react';
import '../CSS/SideMenuStyle.css';
import ImageComponent from './ImageComponent';

import logo from '../Images/logo_placeholder.png';

class AdminSideMenu extends React.Component {
    render() {
        return(
            <div class="sidemenu">
                <ImageComponent className='logo' imgURL={logo} altText={'Home'} subtitle={''} link={'./AdminDashboardPage'} />
                <a href="./AdminUserListPage">Users</a>
                <a href="./AdminPetListPage">Pets</a>
                <a href="./AdminItemListPage">Items</a>
            </div>
        );
    }
}

export default AdminSideMenu;