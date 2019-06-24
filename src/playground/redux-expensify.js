import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

// Action Generators

// ADD_EXPENSE
const addExpense = ( 
    { 
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0  
    } = {} ) => 
({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description: description,
        note: note,
        amount: amount,
        createdAt: createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ( {id} ) => ({
    type: 'REMOVE_EXPENSE',
    expense: {
        id: id
    }
});

// EDIT_EXPENSE
const editExpense = (id, expense) => ({
    type: 'EDIT_EXPENSE',
    id: id,
    modifiedExpense: expense
});

// SET_TEXT_FILTER
const setTextFilter = (textFilter = '') => ({
    type: 'SET_TEXT_FILTER',
    text: textFilter
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate: startDate
});

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate: endDate
});

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
        default:
            return expensesState;
    }
};

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (filterState = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...filterState,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...filterState,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...filterState,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...filterState,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...filterState,
                endDate: action.endDate
            }
        default:
            return filterState;
    }
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

// Subscribe to state changes
store.subscribe(() => {
    const visibleExpenses = getVisibleExpenses(store.getState().expenses, store.getState().filters);
    console.log(visibleExpenses);
});

// // Dispatch add expense actions
const expenseTwo = store.dispatch(addExpense( { description: 'Costco', amount: 117000, createdAt: 10000} ));
const expenseOne = store.dispatch(addExpense( { description: 'HEB', amount: 5000, createdAt: 100} ));

// // Dispatch remove expense actions
// store.dispatch(removeExpense(expenseOne.expense));

// // Dispatch edit expense actions
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 150000 }));

// // Dispatch set text filter actions
// store.dispatch(setTextFilter('he'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(90));
// // store.dispatch(setStartDate());
// store.dispatch(setEndDate(12500));

const demoState = {
    expenses: [{
        id: 'poirerierh',
        description: 'Janurary Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};