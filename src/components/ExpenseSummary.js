import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = ({ visibleExpenseCount, hiddenExpenseCount, expenseTotal }) => {
    const formattedExpenseTotal = numeral(expenseTotal / 100).format('$0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
                { 
                    visibleExpenseCount === 0 ? 
                        ( 
                            <h1 className="page-header__title"> 
                                No expense returned 
                            </h1> 
                        ) :
                        ( 
                            <h1 className="page-header__title"> 
                                Viewing <span>{visibleExpenseCount}</span> expense(s) totalling <span>{formattedExpenseTotal}</span> 
                            </h1> 
                        )
                    }
                    {
                        hiddenExpenseCount === 0 ?
                        (
                            <h3 className="page-header__subtitle">
                                No expense hidden due to filters
                            </h3>
                        ) :
                        (
                            <h3 className="page-header__subtitle">
                                <span>{hiddenExpenseCount}</span> hidden expense due to filters
                            </h3>
                        )
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
        visibleExpenseCount: visibleExpenses.length,
        hiddenExpenseCount: state.expenses.length - visibleExpenses.length,
        expenseTotal: getExpensesTotal(visibleExpenses)
    }
};

// Return a HOC which is connected to the redux state
export default connect(mapStateToProps)(ExpenseSummary);