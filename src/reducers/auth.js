const authReducer = (authState = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {userId: action.userId};
        case 'LOGOUT':
            return {}
        default:
            return authState;       
    }
};

export default authReducer;