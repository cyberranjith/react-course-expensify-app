import { createStore } from 'redux';

// Action generators

const incrementCount = ( {incrementBy = 1} = {} ) => {
    return {
        type: 'INCREMENT',
        incrementBy: incrementBy
    }
};
const decrementCount = ( {decrementBy = 1} = {} ) => {
    return {
        type: 'DECREMENT',
        decrementBy: decrementBy
    }
};
const setCount = ( {count = 1} = {} ) => {
    return {
        type: 'SET',
        count: count
    }
};
const resetCount = () => {
    return {
        type: 'RESET'
    }
};

// Reducer
// Reducers must follow two rules:
// 1. Should be pure functions
// 2. Must not change the input state or action

const countReducer = (state = { count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
    return state;
};

// Create Store
const store = createStore(countReducer);

// Subscribe to state changes
store.subscribe( () => {
    console.log(store.getState());
});

// Dispatch actions
store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(incrementCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount( {decrementBy: 5} ));

store.dispatch(setCount( {count: 10} ));

store.dispatch(resetCount());