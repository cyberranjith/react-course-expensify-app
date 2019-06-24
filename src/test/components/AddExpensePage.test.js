import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let onSubmit, history, wrapper;

beforeEach( () => {
    onSubmit = jest.fn();
    history = {
        push: jest.fn()
    };
    wrapper = shallow(<AddExpensePage addExpense={onSubmit} history={history} />);
});

test('should render the add expense page correctly', () => {    
    expect(wrapper).toMatchSnapshot();
});

test('should submit add expense page correctly', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(onSubmit).toHaveBeenLastCalledWith(expenses[1]);
});