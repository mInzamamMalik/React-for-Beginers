export class ChatAction {

    static GET_MESSAGE = 'GET_MESSAGE          ';
    static GET_MESSAGE_ADDED = 'GET_MESSAGE_ADDED    ';
    static GET_MESSAGE_REMOVED = 'GET_MESSAGE_REMOVED  ';
    static GET_MESSAGE_CHANGED = 'GET_MESSAGE_CHANGED  ';
    static GET_MESSAGE_CANCELLED = 'GET_MESSAGE_CANCELLED';

    static ADD_MESSAGE = 'ADD_MESSAGE';
    static NULL = 'NULL';

    static getMessages() {
        return { type: ChatAction.GET_MESSAGE }
    }
    static addMessage(message: string) {
        return { type: ChatAction.ADD_MESSAGE, payload: message }
    }
}