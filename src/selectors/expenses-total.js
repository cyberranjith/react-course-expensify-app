const getExpensesTotal = (expenses) => { 
    var expensesTotal = 0;
    if (expenses) {
        if (Array.isArray(expenses) && expenses.length > 0) {
            const expenseAmountArray = expenses.map( expense => expense.amount );            
            expensesTotal = expenseAmountArray.reduce( (accumulator, currentValue) => accumulator + currentValue );
        } else {
            expensesTotal = expenses.amount;
        }
    }
    return expensesTotal;
};

export default getExpensesTotal;