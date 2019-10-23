import React from 'react';
// import '../CSS/__.css';

function PetStatus(props)  {
    const { numHunger, numHappiness, numIntelligence, numStrength, numSpeed } = props;
    return (
        <ul>
            <li> Hunger: {numHunger} </li>
            <li> Hunger: {numHappiness} </li>
            <li> Hunger: {numIntelligence} </li>
            <li> Hunger: {numStrength} </li>
            <li> Hunger: {numSpeed} </li>
        </ul>
    );
}

export default PetStatus