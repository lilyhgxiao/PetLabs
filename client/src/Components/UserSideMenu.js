import React from 'react';
import '../CSS/SideMenuStyle.css';
import { Link } from 'react-router-dom';

import logo from '../Images/logo_placeholder.png';

function UserSideMenu(props) {
    return(
        <div className="sidemenu">
            <Link to={'./UserDashboardPage'}>
                <input
                    type='image'
                    src={logo}
                    alt={'Home'} 
                />
            </Link>
            <Link to={'./ShopPage'}>Store</Link>
            <Link to={'./UserSettingsPage'}>Settings</Link>
            <Link to={'./HelpPage'}>Help</Link>
            <Link to={'./login'}>Log out</Link>
        </div>
    );
}

export default UserSideMenu;