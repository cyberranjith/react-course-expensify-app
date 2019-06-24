// Higher Order Components (HOC)
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info:</h1>
        <p>The info message is : {props.info}</p>
    </div>
);

const requireAuthentication = (wrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <Info {...props} /> : <p>You should authenticate to see the info message!</p>}
        </div>
    );
};

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={false} info="My info message"/>, document.getElementById('app'));