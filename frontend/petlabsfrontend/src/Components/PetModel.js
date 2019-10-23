import React from 'react';
// import '../CSS/__.css';
import '../CSS/UserPetCareStyles.css';

function PetModel(props)  {
    const { imgSource, petName } = props;
    return (
        <div className='pet'>
            <span id='petName'>{(petName) ? petName : '--'}</span>
            <img class="petImg" src={imgSource} />
        </div>
    );
}

export default PetModel