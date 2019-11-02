import React from 'react';

import '../CSS/GoldDisplayStyle.css';

function GoldDisplay(props)  {
    const { gold } = props;
    return (
        <div className='goldContainer'>
            <span className='goldField'>You have:</span><span className='goldValue'>{ gold }G</span>
        </div>
    );
}

export default GoldDisplay;