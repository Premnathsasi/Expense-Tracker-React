import React from 'react';

import classes from './ExpenseItems.module.css';

const ExpenseItem = (props) => {
  return (
    <div className={classes.item}>
      <span>{props.item.type}</span>
      <span>₹{props.item.amount}</span>
      <span>{props.item.description}</span>
    </div>
  );
};

export default ExpenseItem;