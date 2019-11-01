import React from 'react';
import '../CSS/ImageLinkStyle.css';

function PetComponent(props) {
    const { petType, selectPet } = props;

    return(
        <div className='petType'>
            <img src={petType.happyImage} alt={petType.name} onClick={ selectPet.bind(this, petType) }/>
            <br/>
            <span id='typeName'>
                {petType.name}
            </span>
            <br/>
            <span id='price'>
                ${petType.price}
            </span>
        </div>
    );
}

export default PetComponent;