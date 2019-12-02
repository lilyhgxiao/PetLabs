import React from 'react';
import '../CSS/SideMenuStyle.css';
import { Link } from 'react-router-dom';

import logo from '../Images/logo_placeholder.png';

function AdminSideMenu(props) {
    return (
        <div className="sidemenu">
            <Link to={'./AdminDashboardPage'}>
                <input
                    type='image'
                    src={logo}
                    alt={'Home'}
                />
            </Link>
            <Link to={'./AdminUserListPage'}>Users</Link>
            <Link to={'./AdminPetListPage'}>Pets</Link>
            <Link to={'./AdminItemListPage'}>Items</Link>
            <Link to={'./'}>Log out</Link>
        </div>
    );
}

export default AdminSideMenu;