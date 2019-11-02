import React from 'react';
// import '../CSS/__.css';
import '../../CSS/UserPetCareStyles.css';

function PetStatus(props)  {
    const { numFullness, numHappiness, numIntelligence, numStrength, numSpeed, petName } = props;
    return (
        <div id='statusBlock'>
            <span id='petName'>{(petName) ? petName : '--'}</span>
            <br/>
            <div className='petStats'>
                <span className='careStatusName'>Fullness:</span><span className='careStatusValue'>{numFullness}</span><br/>
                <span className='careStatusName'>Happiness:</span><span className='careStatusValue'>{numHappiness}</span><br/>
                <span className='careStatusName'>Intelligence:</span><span className='careStatusValue'>{numIntelligence}</span><br/>
                <span className='careStatusName'>Strength:</span><span className='careStatusValue'>{numStrength}</span><br/>
                <span className='careStatusName'>Speed:</span><span className='careStatusValue'>{numSpeed}</span><br/>
            </div>
        </div>
    );
}

export default PetStatus