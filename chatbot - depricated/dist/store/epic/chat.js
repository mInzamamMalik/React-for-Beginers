"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var chat_1 = require("./../action/chat");
var firebase_1 = require("../../service/firebase");
var ChatEpic = (function () {
    function ChatEpic() {
    }
    ChatEpic.addTodo = function (action$) {
        return action$.ofType(chat_1.ChatAction.ADD_MESSAGE)
            .switchMap(function (_a) {
            var payload = _a.payload;
            return rxjs_1.Observable.fromPromise(firebase_1.firebaseService.todoref.push(payload))
                .map(function (x) {
                return { type: chat_1.ChatAction.NULL };
            });
        });
    };
    ChatEpic.getTodos = function (action$) {
        return action$.ofType(chat_1.ChatAction.GET_MESSAGE)
            .switchMap(function (_a) {
            var payload = _a.payload;
            return new rxjs_1.Observable(function (observer) {
                firebase_1.firebaseService.todoref.on("child_added", function (snapshot) {
                    observer.next({
                        type: chat_1.ChatAction.GET_MESSAGE_ADDED,
                        payload: {
                            key: snapshot.key,
                            val: snapshot.val()
                        }
                    });
                });
                firebase_1.firebaseService.todoref.on("child_changed", function (snapshot) {
                    observer.next({
                        type: chat_1.ChatAction.GET_MESSAGE_CHANGED,
                        payload: {
                            key: snapshot.key,
                            val: snapshot.val()
                        }
                    });
                });
                firebase_1.firebaseService.todoref.on("child_removed", function (snapshot) {
                    observer.next({
                        type: chat_1.ChatAction.GET_MESSAGE_REMOVED,
                        payload: snapshot.key
                    });
                });
            }).takeUntil(action$.ofType(chat_1.ChatAction.GET_MESSAGE_CANCELLED));
        });
    };
    ChatEpic.getTodosCancel = function (action$) {
        return action$.ofType(chat_1.ChatAction.GET_MESSAGE_CANCELLED)
            .switchMap(function (_a) {
            var payload = _a.payload;
            firebase_1.firebaseService.todoref.off();
            return rxjs_1.Observable.of({ type: chat_1.ChatAction.NULL });
            //we dont want to do any work on GET_MESSAGE_CANCELLED so we are dispatching NULL action
        });
    };
    return ChatEpic;
}());
exports.ChatEpic = ChatEpic;
//# sourceMappingURL=chat.js.map