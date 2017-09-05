import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import * as logger from 'redux-logger';

// Application State IAppState
interface IAppState {
    ChatReducer
}
//requiring all reducers
import { ChatReducer } from './reducer/chat';

//requiring all epics
import { ChatEpic } from './epic/chat';

//combine epic
const rootEpic = combineEpics(
    ChatEpic.addTodo,
    ChatEpic.getTodos,
    ChatEpic.getTodosCancel,
);
//combine reducers
const rootReducer = combineReducers<IAppState>({
    ChatReducer
})

//creating middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

//appling middleware
const createStoreWithMiddleware = applyMiddleware(epicMiddleware/*,logger()*/)(createStore);

//creating store
export let store = createStoreWithMiddleware(rootReducer)
