import React from 'react';
import '../CSS/ImageLinkStyle.css';

import { Link } from 'react-router-dom';

function ImageComponent(props) {
    const { imgURL, altText, subtitle, link } = props;
    return(
        <div className='item'>
            <Link to={link}>
                <input
                    type='image'
                    src={imgURL}
                    alt={altText} 
                />
            </Link>
            <span id='subtitle'>{(subtitle) ? subtitle : ''}</span>
        </div>
    );
}

export default ImageComponent