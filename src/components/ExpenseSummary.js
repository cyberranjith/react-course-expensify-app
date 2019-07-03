import React from 'react';
import {connect} from 'react-redux';

import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = ({ expenseCount, expenseTotal }) => {
    const formattedExpenseTotal = numeral(expenseTotal / 100).format('$0,0.00');
    return (
        <div>
            { 
                expenseCount === 0 ? 
                ( <h1> No expense returned </h1> ) :
                ( <h1> Viewing {expenseCount} expense(s) totalling {formattedExpenseTotal} </h1> )
            }
        </div>
    );
    
};

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        expenseTotal: getExpensesTotal(visibleExpenses)
    }
};

// Return a HOC which is connected to the redux state
export default connect(mapStateToProps)(ExpenseSummary);