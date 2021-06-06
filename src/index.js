import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from "./registerServiceWorker";
import reportWebVitals from './reportWebVitals';

import App from './App';
import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

registerServiceWorker();

reportWebVitals();
