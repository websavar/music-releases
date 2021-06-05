import React, { useState, useEffect, Suspense } from "react";

import gate from './gate';
import './App.scss';
import Loader from "./components/Loader";
import Search from "./components/Search";

const MusicRelease = React.lazy(() => import('./components/MusicRelease'));

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async (q) => {
        const discogsList = await gate.fetchDicogs(q);
        setData(discogsList);
        setLoading(false);
    };

    useEffect(() => {
        fetchData('*');
    }, []);

    if (loading) return <Loader type="spinner" />;
    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <Search getSearchValue={(val) => fetchData(val)} items={data} />
                </div>
                <div className="row">
                    {data?.length === 0 ? <div>Nothing found! Please try a different search</div> :
                        data.map((item) => {
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
