import React from 'react';
// import '../CSS/__.css';

function PetCareAction(props)  {
    const { feedAction, playAction, trainAction } = props;
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
                    }>Train</button>
                </td>
            </tr>
        </table>
    );
}

export default PetCareAction
