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
var ChatMessagesList = (function (_super) {
    __extends(ChatMessagesList, _super);
    function ChatMessagesList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatMessagesList.prototype.render = function () {
        var _this = this;
        var messagesList = Object.keys(this.props.messages).map(function (key, index) {
            var val = _this.props.messages[key];
            return (React.createElement("li", { key: index },
                React.createElement("h3", null,
                    val.from,
                    ": ",
                    val.text)));
        }).reverse();
        return React.createElement("ul", null, messagesList);
    };
    return ChatMessagesList;
}(react_1.Component));
exports.ChatMessagesList = ChatMessagesList;
//# sourceMappingURL=chatMessagesList.js.map