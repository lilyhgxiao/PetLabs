import React from 'react';
import '../CSS/ImageLinkStyle.css';

function SpriteComponent(props) {
    const { imgURL, altText, subtitle, callback } = props;
    return(
        <div className='item'>
            <input
                type='image'
                src={imgURL}
                alt={altText}
                onClick={(callback) ? callback : null} 
            />
            <span id='subtitle'>{(subtitle) ? subtitle : ''}</span>
        </div>
    );
}

export default SpriteComponent;