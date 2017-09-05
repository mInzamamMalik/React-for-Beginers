import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable";

import { ChatAction } from "./../action/chat";
import { firebaseService as fs } from '../../service/firebase';

export class ChatEpic {

    static addTodo = (action$: ActionsObservable<any>) =>
        action$.ofType(ChatAction.ADD_MESSAGE)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(fs.todoref.push(payload))
                    .map((x) => {
                        return { type: ChatAction.NULL };
                    })
            })

    static getTodos = (action$) =>
        action$.ofType(ChatAction.GET_MESSAGE)
            .switchMap(({ payload }) => {
                return new Observable((observer) => {

                    fs.todoref.on("child_added", (snapshot) => {
                        observer.next({
                            type: ChatAction.GET_MESSAGE_ADDED,
                            payload: {
                                key: snapshot.key,
                                val: snapshot.val()
                            }
                        })
                    })
                    fs.todoref.on("child_changed", (snapshot) => {
                        observer.next({
                            type: ChatAction.GET_MESSAGE_CHANGED,
                            payload: {
                                key: snapshot.key,
                                val: snapshot.val()
                            }
                        })
                    })
                    fs.todoref.on("child_removed", (snapshot) => {
                        observer.next({
                            type: ChatAction.GET_MESSAGE_REMOVED,
                            payload: snapshot.key
                        })
                    })
                }).takeUntil(action$.ofType(ChatAction.GET_MESSAGE_CANCELLED));
            })

    static getTodosCancel = (action$) =>
        action$.ofType(ChatAction.GET_MESSAGE_CANCELLED)
            .switchMap(({ payload }) => {
                fs.todoref.off();
                return Observable.of({ type: ChatAction.NULL })
                //we dont want to do any work on GET_MESSAGE_CANCELLED so we are dispatching NULL action
            })

}