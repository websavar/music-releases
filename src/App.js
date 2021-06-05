import React, { useEffect, useState } from "react";

import gate from './gate';
import './App.scss';
import MusicRelease from "./components/MusicRelease";

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
                    {data.map((item) => <MusicRelease item={item} key={item.id} />)}
                </div>
            </div>
        </div >
    );
}

export default App;
