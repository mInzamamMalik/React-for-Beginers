import * as React from 'react';
import { Component } from 'react';

export interface ChatMessagesListProps {
    messages: {}
}
export class ChatMessagesList extends Component<ChatMessagesListProps, any> {

    render() {
        let messagesList = Object.keys(this.props.messages).map((key, index) => {
            let val = this.props.messages[key];
            return (
                <li key={index}>
                    <h3>{val.from}: {val.text}</h3>
                </li>
            )
        }).reverse();

        return <ul>{messagesList}</ul>
    }
}
