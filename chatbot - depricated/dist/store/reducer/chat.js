"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chat_1 = require("./../action/chat");
var INITIAL_STATE = {
    messages: {},
    loading: false,
    isError: false,
};
function ChatReducer(state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case chat_1.ChatAction.GET_MESSAGE:
            return __assign({}, state, { loading: true });
        case chat_1.ChatAction.GET_MESSAGE_ADDED:
            var combineMessages = Object.assign({}, state.messages);
            combineMessages[action.payload.key] = action.payload.val;
            return __assign({}, state, { messages: combineMessages, loading: false });
        case chat_1.ChatAction.GET_MESSAGE_REMOVED:
            var combineMessages = Object.assign({}, state.messages);
            delete combineMessages[action.payload];
            return __assign({}, state, { messages: combineMessages, loading: false });
        case chat_1.ChatAction.GET_MESSAGE_CHANGED:
            var combineMessages = Object.assign({}, state.messages);
            combineMessages[action.payload.key] = action.payload.val;
            return __assign({}, state, { messages: combineMessages, loading: false });
        default:
            return state;
    }
}
exports.ChatReducer = ChatReducer;
//# sourceMappingURL=chat.js.map