"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var config = require("./config");
config;
var App_1 = require("./App");
var react_redux_1 = require("react-redux");
var store_1 = require("./store");
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(App_1.default, null)), document.getElementById('root'));
//# sourceMappingURL=index.js.map