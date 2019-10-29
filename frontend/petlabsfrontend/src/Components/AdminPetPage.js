import React from 'react';

class AdminPetPage extends React.Component {
    render() {
        return(
            <div>AdminPetPage {this.props.location.petTypeId}</div>
        );
    }
}

export default AdminPetPage;