import React from 'react';
import './index.scss';

const MusicImage = (props) => {
    const item = props.item;

    return (
        <div className="img-container">
            <img src={item.thumb ? item.cover_image : "./default-bg.png"} alt={item.title} />
        </div>
    )
}

export default MusicImage;