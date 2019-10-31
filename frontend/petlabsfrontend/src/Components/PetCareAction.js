import React from 'react';
// import '../CSS/__.css';
import '../CSS/UserPetCareStyles.css';

function PetCareAction(props)  {
    const { feedAction, playAction, trainAction, dropdownAction } = props;
    return (
        <table>
            <tr>
                <td>
                    <button onClick={ 
                        feedAction
                    }>Feed</button>
                </td>
                <td>
                    <button onClick={ 
                        playAction
                    }>Play</button>
                </td>
                <td>
                    <button onClick={ 
                        trainAction
                    }>Use an Item</button>
                    <select id="dropdown" onChange={dropdownAction}>
                        <option value="none">Select an item</option>
                    </select>
                </td>
            </tr>
        </table>
    );
}

export default PetCareAction
