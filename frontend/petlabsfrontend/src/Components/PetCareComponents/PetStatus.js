import React from 'react';
// import '../CSS/__.css';
import '../../CSS/UserPetCareStyles.css';

function PetStatus(props)  {
    const { numFullness, numHappiness, numIntelligence, numStrength, numSpeed } = props;
    return (
        <ul>
            <li> Fullness: {numFullness} </li>
            <li> Happiness: {numHappiness} </li>
            <li> Intelligence: {numIntelligence} </li>
            <li> Strength: {numStrength} </li>
            <li> Speed: {numSpeed} </li>
        </ul>
    );
}

export default PetStatus