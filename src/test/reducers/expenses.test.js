import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type:'@@INIT' });
    expect(state).toEqual([]);
});

test('should add expense', () => {
    const expenseToBeAdded = {
        id: '1',
        description: 'Gas',
        amount: 100,
        createdAt: 0,
        note: ''
    };

    const action = {
        type: 'ADD_EXPENSE',
        expense: expenseToBeAdded
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expenseToBeAdded]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expense: expenses[0]
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1], expenses[2]]);
});

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expense: {
            id: -1
        }
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses]);
});

test('should edit expense for the given id', () => {
    const modifiedExpense = {
        ...expenses[2],
        description: 'Health'
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '2',
        modifiedExpense
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], modifiedExpense, expenses[2]]);
});

test('should not edit expense if id not found', () => {
    const modifiedExpense = {
        ...expenses[2],
        description: 'Health'
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        modifiedExpense
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});