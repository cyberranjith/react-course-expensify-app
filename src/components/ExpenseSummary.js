import React from 'react';
import {connect} from 'react-redux';

import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = (props) => (
    <div>
        { 
            props.expenseCount === 0 ? 
            ( <p> No expense returned </p> ) :
            ( <p> Viewing {props.expenseCount} expense(s) totalling {numeral(props.expenseTotal / 100).format('$0,0.00')} </p> )
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenseCount: selectExpenses(state.expenses, state.filters).length,
        expenseTotal: getExpensesTotal(selectExpenses(state.expenses, state.filters))
    }
};

// Return a HOC which is connected to the redux state
export default connect(mapStateToProps)(ExpenseSummary);