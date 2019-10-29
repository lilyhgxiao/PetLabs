import React from 'react';
import '../CSS/AdminDashboardStyles.css';
import ImageComponent from './ImageComponent';
import AdminSideMenu from './AdminSideMenu';

// Images
import users from '../Images/users.png';
import pets from '../Images/pets.png';
import items from '../Images/items.png';

function AdminDashboard(props) {
    const { username } = props;
    return(
        <div>
            <AdminSideMenu/>

            <div className='main'>
                <div className='mainForm'>
                    <h1>Welcome, {username}</h1>
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

export default AdminDashboard;