import React from 'react';
import '../../CSS/UserPetCareStyles.css';

function PetCareAction(props)  {
    const { feedAction, playAction, trainAction, dropdownAction } = props;
    return (
        <table>
            <tbody>
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
                            <option value="-99">Select an item</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default PetCareAction
