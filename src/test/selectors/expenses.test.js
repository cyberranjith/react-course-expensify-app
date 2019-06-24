import getVisibleExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('should filter by text', () => {
    const filter = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const filteredExpenses = getVisibleExpenses(expenses, filter);
    expect(filteredExpenses).toEqual([expenses[1],expenses[2]]);
});

test('should filter by start date', () => {
    const filter = {
        text: undefined,
        sortBy: 'date',
        startDate: moment(0).add(2, 'days'),
        endDate: undefined
    };
    const filteredExpenses = getVisibleExpenses(expenses, filter);
    expect(filteredExpenses).toEqual([expenses[1]]);
});

test('should filter by end date', () => {
    const filter = {
        text: undefined,
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).subtract(1, 'days')
    };
    const filteredExpenses = getVisibleExpenses(expenses, filter);
    expect(filteredExpenses).toEqual([expenses[2]]);
});

test('should filter by start and end date', () => {
    const filter = {
        text: undefined,
        sortBy: 'date',
        startDate: moment(0).subtract(4, 'days'),
        endDate: moment(0).add(2, 'days')
    };
    const filteredExpenses = getVisibleExpenses(expenses, filter);
    expect(filteredExpenses).toEqual([expenses[0],expenses[2]]); 
});

test('should sort by date', () => {
    const filter = {
        text: undefined,
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const filteredExpenses = getVisibleExpenses(expenses, filter);
    expect(filteredExpenses).toEqual([expenses[1], expenses[0], expenses[2]]);
});

test('should sort by amount', () => {
    const filter = {
        text: undefined,
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const filteredExpenses = getVisibleExpenses(expenses, filter);
    expect(filteredExpenses).toEqual([expenses[2], expenses[1], expenses[0]]);
});

