import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const expenseTotal = getExpensesTotal();
    expect(expenseTotal).toEqual(0);
});

test('should correctly add up single expense', () => {
    const expenseTotal = getExpensesTotal(expenses[0]);
    expect(expenseTotal).toEqual(100);
});

test('should correctly add up multiple expenses', () => {
    const expenseTotal = getExpensesTotal(expenses);
    expect(expenseTotal).toEqual(600);
});