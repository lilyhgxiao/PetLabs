import React from 'react';
import '../CSS/ImageLinkStyle.css';

import ImageComponent from './ImageComponent';
import { Link } from 'react-router-dom';


import type0 from '../Images/pets.png';

function PetComponent(props) {
    const { pet, goToPetPage } = props;
    let imgURL = '';

    if (pet.type.name === 'Blob') {
        imgURL = type0
    } else {
        imgURL = type0
    }

    return(
        <div className='pet'>
            <div className='item'>
                <Link onClick={ goToPetPage.bind(this, pet) }>
                    <input
                        type='image'
                        src={imgURL}
                        alt={pet.petName} 
                    />
                </Link>
            </div>
            <br/>
            <span id='subtitle'>
                {pet.petName}
            </span>
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