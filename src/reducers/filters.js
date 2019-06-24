import moment from 'moment';

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};
const filtersReducer = (filterState = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...filterState,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...filterState,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...filterState,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...filterState,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...filterState,
                endDate: action.endDate
            }
        default:
            return filterState;
    }
};

export default filtersReducer;