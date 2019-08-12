import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            note: props.expense ? props.expense.note : '',
            error: ''
        };
    };
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState( () => ( { description: description } ) );
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState( () => ( { note: note } ) );
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState( () => ( { amount: amount } ) );
        }
    };
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ( {createdAt: createdAt} ));
        }        
    };
    onFocusChange = ( {focused} ) => {
        this.setState(() => ({calendarFocused: focused}) );
    };
    onFormSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({error: 'Please provide Description and Amount!'}));
        } else {
            this.setState(() => ({error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };
    render() {
        return (              
            <form className="form" onSubmit={this.onFormSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    className="text-input"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                    autoFocus   
                />
                <input
                    type="text"
                    name="amount"
                    placeholder="Amount"
                    className="text-input"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker 
                    date = {this.state.createdAt}
                    onDateChange = {this.onDateChange}
                    focused = {this.state.calendarFocused}
                    onFocusChange = {this.onFocusChange}                        
                    numberOfMonths={1}
                    isOutsideRange={()=> false}
                />
                <textarea
                    type="textarea"
                    name="note"
                    placeholder="Add a note about your expense"
                    className="text-area"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                />
                <div>
                    <button className="button">Save Expense</button>
                </div>                
            </form>
        )
    }
};