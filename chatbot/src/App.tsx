import * as React from 'react';
import Chat from './containers/chat';

export interface AppProps {
}

class App extends React.Component<AppProps, any> {
    render() {
        return <Chat />
    }
}
export default App;