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
            var combineMessages = Object.assign({}, state.messages);
            combineMessages[action.payload.key] = action.payload.val;
            return { ...state, messages: combineMessages, loading: false };

        case ChatAction.GET_MESSAGE_REMOVED:
            var combineMessages = Object.assign({}, state.messages);
            delete combineMessages[action.payload];
            return { ...state, messages: combineMessages, loading: false };

        case ChatAction.GET_MESSAGE_CHANGED:
            var combineMessages = Object.assign({}, state.messages);
            combineMessages[action.payload.key] = action.payload.val;
            return { ...state, messages: combineMessages, loading: false };

        default:
            return state;
    }
}