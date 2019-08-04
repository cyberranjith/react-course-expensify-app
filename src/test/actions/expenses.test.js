import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, 
        editExpense, 
        removeExpense, 
        startAddExpense, 
        setExpenses, 
        startSetExpenses, 
        startRemoveExpense,
        startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const userId = 'testuserid';
const defaultAuthState = {auth: {userId} };

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(( {id, description, amount, createdAt, note} ) => {
        expensesData[id] = {description, amount, createdAt, note};
    });
    
    database.ref(`users/${userId}/expenses`).set(expensesData).then(() => done());
});

test('should generate remove expense action', () => {
    const removeExpenseAction = removeExpense({ id: 'playnice' });
    expect(removeExpenseAction).toMatchObject({
        type: 'REMOVE_EXPENSE',
        expense: {
            id: 'playnice'
        }
    });
});

test('should remove expense from database and fire action to remove from redux store', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    store.dispatch(startRemoveExpense( { id }))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                expense: {
                    id
                }
            });

            return database.ref(`users/${userId}/expenses/${id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(null);
            done();
        });
});

test('should generate edit expense action', () => {
    const idOfExpenseToBeModified = 'playnice';
    const expenseToBeModified = {
        id: 'playnice',
        description: 'Expense to be modified',
        amount: 100.0,
        createdAt: 1212121,
        note: 'Expense to be modified'
    };
    const editExpenseAction = editExpense(idOfExpenseToBeModified, expenseToBeModified);

    expect(editExpenseAction).toMatchObject({
        type: 'EDIT_EXPENSE',
        id: idOfExpenseToBeModified,
        modifiedExpense: expenseToBeModified
    })
});

test('should edit expense in database and fire action to edit expense in redux store', (done) => {
    const store = createMockStore(defaultAuthState);

    const idOfExpenseToBeModified = expenses[1].id;
    const expenseToBeModified = {
        description: 'Water-Bill',
        amount: 300,
        createdAt: 0,
        note: 'Water-Bill Test Note'
    };

    store.dispatch(startEditExpense(idOfExpenseToBeModified, expenseToBeModified)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id: idOfExpenseToBeModified,
            modifiedExpense: expenseToBeModified
        });

        return database.ref(`users/${userId}/expenses/${idOfExpenseToBeModified}`).once('value');            
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseToBeModified);
        done();
    });
});

test('should generate add expense action with provided values', () => {
    const addExpenseAction = addExpense(expenses[2]);
    expect(addExpenseAction).toMatchObject({
      type: 'ADD_EXPENSE',
      expense: expenses[2]
    })
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Test',
        amount: 3000,
        note: 'This is a test',
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }    
            });

            return database.ref(`users/${userId}/expenses/${actions[0].expense.id}`).once('value');                
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            // Do the assertions only after all the async tasks are complete
            done();
        });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };
    store.dispatch(startAddExpense({}))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseDefaults
                }    
            });

            return database.ref(`users/${userId}/expenses/${actions[0].expense.id}`).once('value');                
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            // Do the assertions only after all the async tasks are complete
            done();
        });
});

test('should set up set expenses action with provided expenses data', () => {    
    const setExpenseAction = setExpenses(expenses);
    expect(setExpenseAction).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch expenses from database', () => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
    });
});

