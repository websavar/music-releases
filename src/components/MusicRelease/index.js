import React, { Suspense } from 'react';
import './index.scss';
import Loader from '../Loader';

const MusicImage = React.lazy(() => import('./MusicImage'));

const MusicRelease = (props) => {
    const item = props.item;

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 align-items-stretch justify-content-end card">
            <div className="card-item">
                <Suspense fallback={<Loader type="dots" />}>
                    <MusicImage item={item} />
                </Suspense>
                <div className="card-info">
                    <h4 className="card-title">
                        {item.title.split('-')[0]}
                    </h4>
                    <div className="card-details">
                        <h6>{item.type}</h6>
                        <h6>{item.country}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicRelease;
