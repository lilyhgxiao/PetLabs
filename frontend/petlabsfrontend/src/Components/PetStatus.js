import React from 'react';
// import '../CSS/__.css';

function PetStatus(props)  {
    const { numHunger, numHappiness, numIntelligence, numStrength, numSpeed } = props;
    return (
        <ul>
            <li> Hunger: {numHunger} </li>
            <li> Happiness: {numHappiness} </li>
            <li> Intelligence: {numIntelligence} </li>
            <li> Strength: {numStrength} </li>
            <li> Speed: {numSpeed} </li>
        </ul>
    );
}

export default PetStatus