import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = (props) => (    
    <Link className="list-item" to={`/edit/${props.expense.id}`}>
        <div>
            <h3 className="list-item__title">{props.expense.description}</h3>
            <span className="list-item__subtitle">
               {moment(props.expense.createdAt).format('MMMM Do, YYYY')}
            </span>
        </div>
        <h3 className="list-item__data">
           {numeral(props.expense.amount / 100).format('$0,0.00')}
        </h3>
    </Link>
);

export default ExpenseListItem;