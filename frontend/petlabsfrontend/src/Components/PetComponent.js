import React from 'react';
import '../CSS/ImageLinkStyle.css';

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
            <br/>
            <span id='happiness'>
                <span className='statusName'>Happiness: </span><span className='statusValue'>{ pet.happiness }%</span>
            </span>
            <br/>
            <span id='hunger'>
                <span className='statusName'>Hunger: </span><span className='statusValue'>{pet.hunger}%</span>
            </span>
        </div>
    );
}

export default PetComponent;