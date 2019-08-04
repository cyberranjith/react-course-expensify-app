import authReducer from '../../reducers/auth';
import {login, logout} from '../../actions/auth';

test('should set userId in state after login action', () => {
    const currentState = {};
    const loginAction = login('2');

    const authState = authReducer(currentState, loginAction);
    expect(authState).toEqual({
        userId: '2'
    });
});

test('should override userId in state after login action', () => {
    const currentState = {userId: '1'};
    const loginAction = login('2');

    const authState = authReducer(currentState, loginAction);
    expect(authState).toEqual({
        userId: '2'
    });
});

test('should remove userId from state after logout action', () => {
    const currentState = {userId: '1'};
    const logoutAction = logout('2');

    const authState = authReducer(currentState, logoutAction);
    expect(authState).toEqual({
        userId: undefined
    });
});