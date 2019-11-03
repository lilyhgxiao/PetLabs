import React from 'react';
import '../CSS/PetComponentStyle.css';

import Database from '../TempClasses/Database'

import pet_dead from '../Images/pet_dead.png';

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
                    <span className='statusName'>Fullness: </span><span className='statusValue'>{pet.fullness}%</span>
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
    if (pet.alive) {
        if (pet.happiness >= 80) {
            return petType.happyImage;
        } else if (pet.happiness < 80 && pet.happiness >= 30) {
            return petType.neutralImage;
        } else {
            return petType.sadImage;
        }
    } else {
        return pet_dead;
    }
    

}

export default PetComponent;