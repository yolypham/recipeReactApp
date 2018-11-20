import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';


const template = (
    <Provider store={store}>
        <div>
            <App />
        </div>
    </Provider>
);

ReactDOM.render(template, document.getElementById('root'));
