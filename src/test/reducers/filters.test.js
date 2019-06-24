import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should set default state', () => {
    const state = filtersReducer(undefined, { type:'@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set text filter', () => {
    const currentState = {
        text: 'Water'
    };
    const action = {
        type: 'SET_TEXT_FILTER',
        text: 'Rent'
    };
    const state = filtersReducer(currentState, action);
    expect(state.text).toBe('Rent');
});

test('should set sort by amount filter', () => {    
    const action = {
        type: 'SORT_BY_AMOUNT'
    };
    const state = filtersReducer(undefined, action);
    expect(state.sortBy).toBe('amount');
});

test('should set sort by date filter', () => {
    const currentState = {
        sortBy: 'date'
    };
    const action = {
        type: 'SORT_BY_DATE'
    };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set start date filter', () => {
    const action = {
        type: 'SET_START_DATE',
        startDate: moment(0).add(20, 'days')
    };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(moment(0).add(20, 'days'));
});

test('should set end date filter', () => {
    const action = {
        type: 'SET_END_DATE',
        endDate: moment(0).add(20, 'days')
    };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(moment(0).add(20, 'days'));
});
