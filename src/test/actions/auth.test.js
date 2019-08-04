import {login, logout} from '../../actions/auth';

test('should generate login action correctly', () => {
    const loginAction = login('playnice1');
    expect(loginAction).toEqual({
        type: 'LOGIN',
        userId: 'playnice1'
    });
});

test('should generate logout action correctly', () => {
    const logoutAction = logout();
    expect(logoutAction).toEqual({
        type: 'LOGOUT'
    });
})