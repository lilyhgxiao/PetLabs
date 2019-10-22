import React from 'react';
import AdminSideMenu from './AdminSideMenu';

class AdminPetListPage extends React.Component {
    render() {
        return(
            <div>
                <AdminSideMenu/>

                <div className='main'>
                    AdminPetsListPage
                </div>
            </div>
        );
    }
}

export default AdminPetListPage;