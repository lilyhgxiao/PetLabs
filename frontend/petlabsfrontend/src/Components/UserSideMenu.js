import React from 'react';
import '../CSS/SideMenuStyle.css';
import ImageComponent from './ImageComponent';

import logo from '../Images/logo_placeholder.png';

class UserSideMenu extends React.Component {
    render() {
        return(
            <div class="sidemenu">
                <ImageComponent className='logo' imgURL={logo} altText={'Home'} subtitle={''} link={'./UserDashboardPage'} />
                <a href="#">Store</a>
                <a href="#">Settings</a>
                <a href="#">Help</a>
            </div>
        );
    }
}

export default UserSideMenu;