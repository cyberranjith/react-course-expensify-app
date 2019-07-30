import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense } from '../actions/expenses'
import { startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onFormSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    onRemoveExpenseButtonClick = (e) => {
        this.props.startRemoveExpense(this.props.expense);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onFormSubmit}
                />
                <button onClick={this.onRemoveExpenseButtonClick}>
                    Remove
                </button>
            </div>
            
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find( (expense) => expense.id === props.match.params.id )
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startEditExpense: (id, expense) => {
            dispatch(startEditExpense(id, expense));
        },
        startRemoveExpense: (expense) => {
            dispatch(startRemoveExpense(expense));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);