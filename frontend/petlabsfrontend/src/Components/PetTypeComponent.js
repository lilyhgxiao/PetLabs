import React from 'react';
import '../CSS/CreatePetStyle.css';

function PetComponent(props) {
    const { petType, selectPet } = props;

    return(
        <div className='petType'>
            <img className='petTypeImg' src={petType.happyImage} alt={petType.name} onClick={ selectPet.bind(this, petType) }/>
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