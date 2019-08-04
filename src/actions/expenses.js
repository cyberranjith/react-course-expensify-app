import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => 
({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0 
        } = expenseData;

        const userId = getState().auth.userId;
        const expense = {description, note, amount, createdAt};

        return database.ref(`users/${userId}/expenses`)
            .push(expense)
            .then((ref) => {
                dispatch(addExpense({
                    id: ref.key,
                    ...expense
                }));
        });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ( {id} ) => ({
    type: 'REMOVE_EXPENSE',
    expense: {
        id: id
    }
});

export const startRemoveExpense = ( {id} ) => {
    return (dispatch, getState) => {
        const userId = getState().auth.userId;
        return database.ref(`users/${userId}/expenses/${id}`)
            .remove()
            .then(() => {
                dispatch(removeExpense( {id} ));
            });
    };
}

// EDIT_EXPENSE
export const editExpense = (id, expense) => ({
    type: 'EDIT_EXPENSE',
    id: id,
    modifiedExpense: expense
});

export const startEditExpense = (id, expense) => {
    return (dispatch, getState) => {
        const userId = getState().auth.userId;
        return database.ref(`users/${userId}/expenses/${id}`)
            .update({
                ...expense
            }).then(() => {
                dispatch(editExpense(id, expense));
            });
    };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const userId = getState().auth.userId;
        return database.ref(`users/${userId}/expenses`).once('value').then( (snapshot) => {
            const expenses = [];

            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            });

            dispatch(setExpenses(expenses));
        });
    };
};