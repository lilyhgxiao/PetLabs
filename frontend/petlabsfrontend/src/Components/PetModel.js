import React from 'react';
// import '../CSS/__.css';

function PetModel(props)  {
    const { imgSource, petName } = props;
    return (
        <div className='pet'>
            <img class="petImg" src={imgSource} />
            <span id='petName'>{(petName) ? petName : '--'}</span>
        </div>
    );
}

export default PetModel