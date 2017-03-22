import * as React from "react";
import * as ReactDOM from "react-dom";

import * as config from './config'; config;
import Chat from './App';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
    <Provider store={store}>
        <Chat />
    </Provider>,
    document.getElementById('root')
);
