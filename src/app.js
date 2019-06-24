import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import {Provider} from 'react-redux'

import configureStore from './store/configureStore';

import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import { sortByAmount } from './actions/filters';
import { sortByDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

//css reset
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

store.dispatch(addExpense( {description: 'Water Bill', amount: 7000, createdAt: 80000} ));
store.dispatch(addExpense( {description: 'Gas Bill', amount: 6000, createdAt: 20000} ));
store.dispatch(addExpense( {description: 'Grocery Bill', amount: 15000, createdAt: 70000} ));
store.dispatch(addExpense( {description: 'Electricity Bill', amount: 9000, createdAt: 100000} ));

store.dispatch(sortByDate());

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));