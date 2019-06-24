import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense } from '../actions/expenses'
import { removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onFormSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    onRemoveExpenseButtonClick = (e) => {
        this.props.removeExpense(this.props.expense);
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
        editExpense: (id, expense) => {
            dispatch(editExpense(id, expense));
        },
        removeExpense: (expense) => {
            dispatch(removeExpense(expense));
        } 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);