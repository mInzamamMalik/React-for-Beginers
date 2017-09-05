import * as React from 'react';
import { Component } from 'react';

export interface ChatInputProps {
    sendMessage(text: { from: string, to: string, text: string })
}
export class ChatInput extends Component<ChatInputProps, any> {

    submitHandle(e) {
        e.preventDefault();
        this.props.sendMessage({
            from: "Me",
            to: "bot",
            text: this.refs.newMessage["value"]
        });
        this.refs.newMessage["value"] = "";
    }
    render() {
        return (<form onSubmit={this.submitHandle.bind(this)}>
            <input type="text" placeholder="Your message here" ref="newMessage" />
            <button type="submit">Send</button>
        </form>)
    }
}
