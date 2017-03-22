import { ChatAction } from "./../action/chat";

const INITIAL_STATE = {
    messages: {},
    loading: false,
    isError: false,
}
interface IAction {
    type: string,
    payload?: any
}

export function ChatReducer(state = INITIAL_STATE, action: IAction) {
    switch (action.type) {

        case ChatAction.GET_MESSAGE:
            return { ...state, loading: true };

        case ChatAction.GET_MESSAGE_ADDED:
            var newTodos = Object.assign({}, state.messages);
            newTodos[action.payload.key] = action.payload.val;
            return { ...state, todos: newTodos, loading: false };

        case ChatAction.GET_MESSAGE_REMOVED:
            var newTodos = Object.assign({}, state.messages);
            delete newTodos[action.payload];
            return { ...state, todos: newTodos, loading: false };

        case ChatAction.GET_MESSAGE_CHANGED:
            var newTodos = Object.assign({}, state.messages);
            newTodos[action.payload.key] = action.payload.val;
            return { ...state, todos: newTodos, loading: false };

        default:
            return state;
    }
}