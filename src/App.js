import React from 'react';
import {render} from 'react-dom';

import Home from './components/Home'

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h1>Hello</h1>
                <Home/>
            </React.Fragment>

        );
    }
}

render(<App/>, document.getElementById('root'))