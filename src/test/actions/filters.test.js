import { setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate } from '../../actions/filters';
import moment from 'moment';

test('should generate SET_TEXT_FILTER action object with default text filter',() => {
    const action = setTextFilter();
    expect(action).toMatchObject({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should generate SET_TEXT_FILTER action object with input text filter',() => {
    const action = setTextFilter('bill');
    expect(action).toMatchObject({
        type: 'SET_TEXT_FILTER',
        text: 'bill'
    });
});

test('should generate SORT_BY_DATE action object', () => {
    const action = sortByDate();
    expect(action).toMatchObject({
        type: 'SORT_BY_DATE'
    });
});

test('should generate SORT_BY_AMOUNT action object', () => {
    const action = sortByAmount();
    expect(action).toMatchObject({
        type: 'SORT_BY_AMOUNT'
    });
});

test('should generate SET_START_DATE action object with default value', () => {
    const action = setStartDate();
    expect(action).toMatchObject({
        type: 'SET_START_DATE',
        startDate: undefined
    });
});

test('should generate SET_START_DATE action object with input value', () => {
    const action = setStartDate(moment(0));
    expect(action).toMatchObject({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should generate SET_END_DATE action object with default value', () => {
    const action = setEndDate();
    expect(action).toMatchObject({
        type: 'SET_END_DATE',
        endDate: undefined
    });
});

test('should generate SET_END_DATE action object with input value', () => {
    const action = setEndDate(moment(0));
    expect(action).toMatchObject({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});