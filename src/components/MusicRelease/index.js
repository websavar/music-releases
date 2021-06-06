import React, { Suspense } from 'react';
import Loader from '../Loader';
import './index.scss';
// import MusicImage from './MusicImage';

const MusicImage = React.lazy(() => import('./MusicImage'));

const MusicRelease = (props) => {
    const item = props.item;

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 align-items-stretch justify-content-end card">
            <div className="card-item">
                {/* <div className="img-container">
                    <img src={item.cover_image ? item.cover_image : "./default-bg.png"} alt={item.title} />
                </div> */}
                <Suspense fallback={<Loader type="dots" />}>
                    <MusicImage item={item} />
                </Suspense>
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