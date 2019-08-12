import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = ({ expenseCount, expenseTotal }) => {
    const formattedExpenseTotal = numeral(expenseTotal / 100).format('$0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
                { 
                    expenseCount === 0 ? 
                    ( <h1 className="page-header__title"> No expense returned </h1> ) :
                    ( <h1 className="page-header__title"> Viewing <span>{expenseCount}</span> expense(s) totalling <span>{formattedExpenseTotal}</span> </h1> )
                }
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>            
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