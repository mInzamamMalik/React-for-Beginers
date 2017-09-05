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
var ChatInput = (function (_super) {
    __extends(ChatInput, _super);
    function ChatInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatInput.prototype.submitHandle = function (e) {
        e.preventDefault();
        this.props.sendMessage({
            from: "Me",
            to: "bot",
            text: this.refs.newMessage["value"]
        });
        this.refs.newMessage["value"] = "";
    };
    ChatInput.prototype.render = function () {
        return (React.createElement("form", { onSubmit: this.submitHandle.bind(this) },
            React.createElement("input", { type: "text", placeholder: "Your message here", ref: "newMessage" }),
            React.createElement("button", { type: "submit" }, "Send")));
    };
    return ChatInput;
}(react_1.Component));
exports.ChatInput = ChatInput;
//# sourceMappingURL=chatInputForm.js.map