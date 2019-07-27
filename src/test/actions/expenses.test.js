import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, editExpense, removeExpense, startAddExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(( {id, description, amount, createdAt, note}) => {
        expensesData[id] = {description, amount, createdAt, note};
    });
    database.ref('expense').set(expensesData).then(() => done());
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

test('should generate add expense action with provided values', () => {
    const addExpenseAction = addExpense(expenses[2]);
    expect(addExpenseAction).toMatchObject({
      type: 'ADD_EXPENSE',
      expense: expenses[2]
    })
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
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

            database.ref(`expense/${actions[0].expense.id}`)
                .once('value')
                .then((snapshot) => {
                    expect(snapshot.val()).toEqual(expenseData);
                    // Do the assertions only after all the async tasks are complete
                    done();
                });
        });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
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

            database.ref(`expense/${actions[0].expense.id}`)
                .once('value')
                .then((snapshot) => {
                    expect(snapshot.val()).toEqual(expenseDefaults);
                    // Do the assertions only after all the async tasks are complete
                    done();
                });
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
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
    });
});

