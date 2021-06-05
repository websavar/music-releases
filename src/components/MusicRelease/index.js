import React from 'react';
import './index.scss';

const MusicRelease = (props) => {
    const item = props.item;
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 align-items-stretch card">
            <div className="card-item">
                <img src={item.thumb ? item.thumb : "./default-bg.png"} alt={item.title} />
                <div className="card-info">
                    <div className="card-title">
                        {item.title.split('-')[0]}
                    </div>
                    <div className="card-details">
                        <div>{item.genre}</div>
                        <div>{item.year}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicRelease;