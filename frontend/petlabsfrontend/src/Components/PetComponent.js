import React from 'react';
import '../CSS/PetComponentStyle.css';

import { Link } from 'react-router-dom';
import Database from '../TempClasses/Database'

function PetComponent(props) {
    const { pet, goToPetPage } = props;
    
    let imgURL = retrieveImgURL(pet);

    return(
        <div className='petComponent' onClick={ goToPetPage.bind(this, pet) }>
            <img className='petImg' src={imgURL} alt={pet.petName}/>
            <div className='info'>
                <span id='name'>
                    {pet.petName}
                </span>
                <span id='happiness'>
                    <span className='statusName'>Happiness: </span><span className='statusValue'>{ pet.happiness }%</span>
                </span>
                <br/>
                <span id='fullness'>
                    <span className='statusName'>Fullness: </span><span className='statusValue'>{pet.hunger}%</span>
                </span>
                <br/>
            </div>
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