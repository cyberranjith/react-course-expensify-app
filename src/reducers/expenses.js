import expenses from "../test/fixtures/expenses";

// Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (expensesState = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...expensesState, action.expense]
        case 'REMOVE_EXPENSE':
            return expensesState.filter( expense => expense.id !== action.expense.id );
        case 'EDIT_EXPENSE':
            return expensesState.map( (expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.modifiedExpense
                    }
                } else {
                    return expense;
                }
            });
        case 'SET_EXPENSES':
                return action.expenses;
        default:
            return expensesState;
    }
};

export default expensesReducer;