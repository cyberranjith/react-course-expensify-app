import { firebase, googleAuthProvider, gitHubAuthProvider } from '../firebase/firebase';

export const login = (userId) => {
    return {
        type: 'LOGIN',
        userId
    }
};

export const startGoogleLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    }        
};

export const startGitLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(gitHubAuthProvider);
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
};

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};