import React from 'react';

class AdminUserPage extends React.Component {
    render() {
        console.log(this.props);
        return(
            <div>Value recieved in props is {this.props.location.username}</div>
        );
    }
}

export default AdminUserPage;