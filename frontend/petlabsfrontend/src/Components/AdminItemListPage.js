import React from 'react';
import AdminSideMenu from './AdminSideMenu';


class AdminItemListPage extends React.Component {
    render() {
        return(
            <div>
                <AdminSideMenu/>
                
                <div className='main'>
                    AdminItemListPage
                </div>
            </div>
        );
    }
}

export default AdminItemListPage