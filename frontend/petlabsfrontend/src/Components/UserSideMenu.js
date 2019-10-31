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
            <Link to={'./AdminUserListPage'}>Store</Link>
            <Link to={'./AdminPetListPage'}>Settings</Link>
            <Link to={'./AdminItemListPage'}>Help</Link>
            <Link to={'./'}>Log out</Link>
        </div>
    );
}

export default UserSideMenu;