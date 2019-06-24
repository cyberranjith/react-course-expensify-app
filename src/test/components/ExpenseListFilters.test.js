import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount, wrapper;

beforeEach( () => {
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    setTextFilter = jest.fn();
    sortByAmount = jest.fn();
    sortByDate = jest.fn();

    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setTextFilter={setTextFilter}
            sortByAmount={sortByAmount}
            sortByDate={sortByDate}
        />
    );
});

test('should render ExpenseListFilters correctly', () =>{
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt filters correctly', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = 'gas';
    wrapper.find('input').at(0).simulate('change', {
        target: {value}
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should handle sort by date', () => {
    wrapper.find('select').at(0).simulate('change', {
        target: {value: 'date'}
    });
    expect(sortByDate).toHaveBeenCalled();
});

test('should handle sort by amount', () => {
    wrapper.find('select').at(0).simulate('change', {
        target: {value: 'amount'}
    });
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => { 
    const startDate = moment(0).add(2, 'years');
    const endDate = moment(0).add(4, 'years');

    wrapper.find('DateRangePicker').prop('onDatesChange')({
        startDate: startDate,
        endDate: endDate
    });
    expect(setStartDate).toHaveBeenCalledWith(startDate);
    expect(setEndDate).toHaveBeenCalledWith(endDate);
});

test('should handle date focus changes', () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});