import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let wrapper, startEditExpense, startRemoveExpense, history;
let expenseToBeEdited = expenses[0];

beforeEach ( () => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = {
        push: jest.fn()
    };
    wrapper = shallow(<EditExpensePage expense={expenseToBeEdited} startEditExpense={startEditExpense} startRemoveExpense={startRemoveExpense} history={history} />);
});

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should remove expense correctly', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(startRemoveExpense).toHaveBeenCalledWith(expenseToBeEdited);
    expect(history.push).toHaveBeenCalledWith('/');
});

test('should edit expense correctly', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenseToBeEdited);
    expect(startEditExpense).toHaveBeenCalledWith(expenseToBeEdited.id, expenseToBeEdited);
    expect(history.push).toHaveBeenCalledWith('/');
});