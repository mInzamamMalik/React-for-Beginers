import Redux from "redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {getRepoReducer} from "./reducer/index.js";
import thunk from "redux-thunk";
import logger from "redux-logger";

export var storeConfig = function () {
    var reducer = combineReducers({getRepoReducer});

    const middleWare = applyMiddleware(thunk, logger())
    var store = createStore(reducer, middleWare);

    return store;
}