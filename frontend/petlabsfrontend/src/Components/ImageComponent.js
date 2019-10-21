import React from 'react';
import '../CSS/ImageLinkStyle.css';

function ImageComponent(props) {
    const { imgURL, altText, subtitle } = props;
    return(
        <div className='item'>
            <img 
                src={imgURL}
                alt={altText} 
            />
            <span id='subtitle'>{(subtitle) ? subtitle : ''}</span>
        </div>
    );
}

export default ImageComponent