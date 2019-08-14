import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense } from '../actions/expenses'
import { startRemoveExpense } from '../actions/expenses';
import ConfirmationModal from './ConfirmationModal';

export class EditExpensePage extends React.Component {
    state = {
        isRemoveButtonClicked : false
    }

    onFormSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    onRemoveExpenseButtonClick = (e) => {
        this.setState( () => ({isRemoveButtonClicked: true}) );
    }

    removeExpense = () => {
        this.props.startRemoveExpense(this.props.expense);
        this.props.history.push('/');
    }

    closeConfirmation = () => {
        this.setState( () => ({isRemoveButtonClicked: false}) );
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onFormSubmit}
                    />
                    <button className="button--secondary" onClick={this.onRemoveExpenseButtonClick}>
                        Remove Expense
                    </button>
                    <ConfirmationModal 
                        showModal={this.state.isRemoveButtonClicked}
                        confirmationText="Are you sure want to remove this expense?"
                        performConfirmedAction={this.removeExpense}
                        closeConfirmation={this.closeConfirmation}
                    />
                </div>
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