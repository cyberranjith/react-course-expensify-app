import React from 'react';
import { connect } from 'react-redux';
import { startGoogleLogin, startGitLogin } from '../actions/auth';

export const LoginPage = ( {startGoogleLogin, startGitLogin} ) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify</h1>
            <p>It's time to get your expenses under control.</p>
            <button className="button" onClick={startGoogleLogin}>Login with Google</button>
            <button className="button" onClick={startGitLogin}>Login with Git</button>
        </div>        
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startGoogleLogin: () => dispatch(startGoogleLogin()),
    startGitLogin: () => dispatch(startGitLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);