import React from 'react';
// import '../CSS/__.css';
import '../../CSS/UserPetCareStyles.css';

function PetModel(props)  {
    const { imgSource } = props;
    return (
        <div className='petModel'>
            <img className="petImg" src={imgSource} alt="Pet Image"/>
        </div>
    );
}

export default PetModel