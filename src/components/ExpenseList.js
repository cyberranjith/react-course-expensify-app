import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';

import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No Expense Found</p>
            ) : (
                props.expenses.map((expense) => {
                    return (
                        <ExpenseListItem key={expense.id} expense={expense} />
                    );
                })
            )
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

// Return a HOC which is connected to the redux state
export default connect(mapStateToProps)(ExpenseList);