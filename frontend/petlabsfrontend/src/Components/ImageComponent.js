import React from 'react';
import '../CSS/ImageLinkStyle.css';

import { Link } from 'react-router-dom';

function ImageComponent(props) {
    const { imgURL, altText, subtitle, link, callback } = props;
    return(
        <div className='item'>
            <Link to={(link) ? link : null}>
                <input
                    type='image'
                    src={imgURL}
                    alt={altText}
                    onClick={(callback) ? callback : null} 
                />
            </Link>
            <span id='subtitle'>{(subtitle) ? subtitle : ''}</span>
        </div>
    );
}

export default ImageComponent