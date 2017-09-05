"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_observable_1 = require("redux-observable");
//requiring all reducers
var chat_1 = require("./reducer/chat");
//requiring all epics
var chat_2 = require("./epic/chat");
//combine epic
var rootEpic = redux_observable_1.combineEpics(chat_2.ChatEpic.addTodo, chat_2.ChatEpic.getTodos, chat_2.ChatEpic.getTodosCancel);
//combine reducers
var rootReducer = redux_1.combineReducers({
    ChatReducer: chat_1.ChatReducer
});
//creating middleware
var epicMiddleware = redux_observable_1.createEpicMiddleware(rootEpic);
//appling middleware
var createStoreWithMiddleware = redux_1.applyMiddleware(epicMiddleware /*,logger()*/)(redux_1.createStore);
//creating store
exports.store = createStoreWithMiddleware(rootReducer);
//# sourceMappingURL=index.js.map