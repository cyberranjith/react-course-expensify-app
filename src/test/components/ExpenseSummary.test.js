import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseSummary} from '../../components/ExpenseSummary';

test('should render Expense Summary with three expense', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={3} expenseTotal={11456}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render Expense Summary with one expense', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={1} expenseTotal={1000}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render Expense Summary with no expense', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={0} expenseTotal={0}/>);
    expect(wrapper).toMatchSnapshot();
});
