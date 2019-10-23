import React from 'react';

import ImageComponent from './ImageComponent';

import type0 from '../Images/pets.png';

function PetComponent(props) {
    const { pet, petPage } = props;
    let imgURL = '';

    if (pet.type === 0) {
        imgURL = type0
    } else {
        imgURL = type0
    }

    return(
        <div className='pet'>
            <ImageComponent imgURL={imgURL} altText={pet.petName} subtitle={pet.petName} link={petPage} />
            <span id='happiness'>Happiness: { pet.happiness }%</span>
            <span id='hunger'>Hunger: {pet.hunger}%</span>
        </div>
    );
}

export default PetComponent;