import React from 'react';
import '../CSS/CreatePetStyle.css';

import PetImageImporter from './PetImageImporter.js';

function PetComponent(props) {
    const { petType, selectPet } = props;

    return(
        <div className='petType'>
            <img className='petTypeImg' src={PetImageImporter.get(petType.happyImage)} alt={petType.name} onClick={ selectPet.bind(this, petType) }/>
            <br/>
            <span id='typeName'>
                {petType.name}
            </span>
            <br/>
            <span id='price'>
                {petType.price}G
            </span>
        </div>
    );
}

export default PetComponent;