import React from 'react';
import './index.scss';

const MusicRelease = (props) => {
    const item = props.item;
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 align-items-stretch justify-content-end card">
            <div className="card-item">
                <div className="img-container">
                    <img src={item.thumb ? item.cover_image : "./default-bg.png"} alt={item.title} />
                </div>
                <div className="card-info">
                    <div className="card-title">
                        {item.title.split('-')[0]}
                    </div>
                    <div className="card-details">
                        <div>{item.type}</div>
                        <div>{item.country}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicRelease;