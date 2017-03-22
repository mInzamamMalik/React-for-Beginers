import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { ChatAction } from '../store/action/chat'

function mapStateToProps(state) {
    return {
        messages: state.ChatReducer.messages,
        loading: state.ChatReducer.loading,
        isError: state.ChatReducer.isError,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getMessages: (): void => dispatch(ChatAction.getMessages()),
        addMessage: (message: string): void => dispatch(ChatAction.addMessage(message)),
    };
}
//React.Component<props, state>
class Chat extends Component<any, any> {
    constructor(props) {
        super(props)
        this.sendMessage = this.sendMessage.bind(this);
        this.props.getMessages(); //start getting todo from firebase
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isError) alert("Error Message: " + nextProps.errorMessage);
    }

    sendMessage(e) {
        e.preventDefault();
        this.props.addMessage(this.refs.newMessage["value"]);
        this.refs.newMessage["value"] = "";
    }

    render() {
        /*let messagesList = Object.keys(this.props.todos).map((key, index) => {
            let val = this.props.todos[key];
            return (
                <li key={index}>
                    <h3> {val.todo}</h3>
                </li>
            )
        })*/
        return (
            <div>
                <h2>Chat Bot</h2>
                <ul>
                    {/*{messagesList}*/}
                </ul>
                <form onSubmit={this.sendMessage}>
                    <input type="text" placeholder="Your message here" ref="newMessage" />
                    <button type="submit">Send</button>
                </form>
                {(this.props.loading) ? <p>Sending...</p> : ""}
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat)