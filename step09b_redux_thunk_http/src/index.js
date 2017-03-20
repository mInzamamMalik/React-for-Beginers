import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from "./container/main"
import {Provider} from "react-redux";
var store = require("./store/store.js").storeConfig();
ReactDOM.render(
 <Provider store = {store}>
   <Main/>
 </Provider>
 ,
  document.getElementById('root')
);
