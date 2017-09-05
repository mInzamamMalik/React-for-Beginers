"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var chat_1 = require("../store/action/chat");
var chatInputForm_1 = require("../components/chatInputForm");
var chatMessagesList_1 = require("../components/chatMessagesList");
function mapStateToProps(state) {
    return {
        messages: state.ChatReducer.messages,
        loading: state.ChatReducer.loading,
        isError: state.ChatReducer.isError,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getMessages: function () { return dispatch(chat_1.ChatAction.getMessages()); },
        addMessage: function (message) { return dispatch(chat_1.ChatAction.addMessage(message)); },
    };
}
//React.Component<props, state>
var Chat = (function (_super) {
    __extends(Chat, _super);
    function Chat(props) {
        var _this = _super.call(this, props) || this;
        _this.props.getMessages(); //start getting todo from firebase
        return _this;
    }
    Chat.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.isError)
            alert("Error Message: " + nextProps.errorMessage);
    };
    Chat.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h2", null, "Chat Bot"),
            React.createElement(chatInputForm_1.ChatInput, { sendMessage: this.props.addMessage }),
            (this.props.loading) ? React.createElement("p", null, "Loading...") : "",
            React.createElement(chatMessagesList_1.ChatMessagesList, { messages: this.props.messages })));
    };
    return Chat;
}(react_1.Component));
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Chat);
//# sourceMappingURL=chat.js.map