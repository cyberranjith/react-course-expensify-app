import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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
    const expenseToBeAdded = {
        description: 'Expense to be modified',
        amount: 100.0,
        createdAt: 1212121,
        note: 'Expense to be modified'
    };

    const addExpenseAction = addExpense(expenseToBeAdded);
    expect(addExpenseAction).toMatchObject({
      type: 'ADD_EXPENSE',
      expense: {
          ...expenseToBeAdded,
          id: expect.any(String)
      }
    })
});

test('should generate add expense action with default values', () => {
    const defaultExpense = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };

    const addExpenseAction = addExpense();
    expect(addExpenseAction).toMatchObject({
        type: 'ADD_EXPENSE',
        expense: {
            ...defaultExpense,
            id: expect.any(String)
        }
    });
});

