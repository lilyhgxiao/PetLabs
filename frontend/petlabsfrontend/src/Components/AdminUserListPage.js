import React from 'react';
import AdminSideMenu from './AdminSideMenu';

class AdminUserListPage extends React.Component {
    render() {
        return(
            <div>
                <AdminSideMenu/>

                <div className='main'>
                    AdminUserPage
                </div>
            </div>
        );
    }
}

export default AdminUserListPage;