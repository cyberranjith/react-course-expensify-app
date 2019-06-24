import moment from 'moment';

const expenses = [{
    id: '1',
    description: 'Gas',
    amount: 100,
    createdAt: 0,
    note: ''
}, {
    id: '2',
    description: 'Water',
    amount: 200,
    createdAt: moment(0).add(4, 'days').valueOf(),
    note: ''
}, {
    id: '3',
    description: 'Rent',
    amount: 300,
    createdAt: moment(0).subtract(4, 'days').valueOf(),
    note: ''
}];

export default expenses;