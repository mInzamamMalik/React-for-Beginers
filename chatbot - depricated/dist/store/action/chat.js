"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatAction = (function () {
    function ChatAction() {
    }
    ChatAction.getMessages = function () {
        return { type: ChatAction.GET_MESSAGE };
    };
    ChatAction.addMessage = function (message) {
        return { type: ChatAction.ADD_MESSAGE, payload: message };
    };
    ChatAction.GET_MESSAGE = 'GET_MESSAGE          ';
    ChatAction.GET_MESSAGE_ADDED = 'GET_MESSAGE_ADDED    ';
    ChatAction.GET_MESSAGE_REMOVED = 'GET_MESSAGE_REMOVED  ';
    ChatAction.GET_MESSAGE_CHANGED = 'GET_MESSAGE_CHANGED  ';
    ChatAction.GET_MESSAGE_CANCELLED = 'GET_MESSAGE_CANCELLED';
    ChatAction.ADD_MESSAGE = 'ADD_MESSAGE';
    ChatAction.NULL = 'NULL';
    return ChatAction;
}());
exports.ChatAction = ChatAction;
//# sourceMappingURL=chat.js.map