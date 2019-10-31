import React from 'react';
import '../CSS/ImageLinkStyle.css';

import { Link } from 'react-router-dom';
import Database from '../TempClasses/Database'

function PetComponent(props) {
    const { pet, goToPetPage } = props;
    
    let imgURL = retrieveImgURL(pet);

    return(
        <div className='pet'>
            <div className='item'>
                <Link to={'#'} onClick={ goToPetPage.bind(this, pet) }>
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

function retrieveImgURL(pet) {
    let petType = '';
    let type = '';

    for (type of Database.petTypes) {
        if (type.name === pet.type) {
            petType = type;
            break;
        }
    }

    if (pet.happiness >= 80) {
        return petType.happyImage;
    } else if (pet.happiness < 80 && pet.happiness >= 50) {
        return petType.neutralImage;
    } else {
        return petType.sadImage;
    }

}

export default PetComponent;