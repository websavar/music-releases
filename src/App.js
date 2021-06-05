import React, { useState, useEffect, Suspense } from "react";

import gate from './gate';
import './App.scss';
import Loader from "./components/Loader";
// import MusicRelease from "./components/MusicRelease";

const MusicRelease = React.lazy(() => import('./components/MusicRelease'))

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const discogsList = await gate.fetchDicogs();
            setData(discogsList);
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    {data.map((item) => {
                        return (
                            <Suspense fallback={<Loader type="gradient" />} key={item.id}>
                                <MusicRelease item={item} />
                            </Suspense>
                        )
                    })
                    }
                </div>
            </div>
        </div >
    );
}

export default App;
