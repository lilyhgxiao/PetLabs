import React from 'react';
import '../CSS/SideMenuStyle.css';
import ImageComponent from './ImageComponent';

import logo from '../Images/logo_placeholder.png';

class UserSideMenu extends React.Component {
    render() {
        return(
            <div class="sidemenu">
                <Link to={'./'}>
                    <input
                        type='image'
                        src={logo}
                        alt={'Home'} 
                    />
                </Link>
                <Link to={'./AdminUserListPage'}>Store</Link>
                <Link to={'./AdminPetListPage'}>Settings</Link>
                <Link to={'./AdminItemListPage'}>Help</Link>
            </div>
        );
    }
}

export default UserSideMenu;