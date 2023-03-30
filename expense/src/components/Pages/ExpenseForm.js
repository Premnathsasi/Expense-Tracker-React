import React, {useRef, useState} from "react";
import ExpenseItem from "./ExpenseItem";
import { useNavigate } from "react-router-dom";
import classes from './ExpenseForm.module.css';
import { Button } from "react-bootstrap";

const ExpenseForm = () => {
    const Navigate = useNavigate();
    const [expenseList, setExpenseList] = useState([]);

  const amountRef = useRef();
  const typeRef = useRef();
  const descriptionRef = useRef();

  const addExpenseHandler = (event) => {
    event.preventDefault();
    const updatedList = {
        amount: amountRef.current.value,
        type: typeRef.current.value,
        description: descriptionRef.current.value,
    }
    setExpenseList((prev) => [...prev, updatedList])
   
  };

  const goToWelcomeHandler = () => {
        Navigate("/welcome")
  }

  const newExpenseList = expenseList.map((item) => (
    <ExpenseItem item={item} key={Math.random().toString()} />
  ));

  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={addExpenseHandler}>
        <div className={classes.type}>
          <label>Expense Type: </label>
          <select ref={typeRef}>
            <option>Food</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Tour</option>
            <option>Others</option>
          </select>
        </div>
        <div className={classes.amount}>
          <label>Expense Amount: </label>
          <input type='number' min='0'  ref={amountRef} />
        </div>
        <div className={classes.description}>
          <label>Expense Description: </label>
          <textarea type='text' ref={descriptionRef} />
        </div>
        <div className={classes.button}>
        <Button variant="danger" onClick={goToWelcomeHandler}>Close</Button>
          <Button type='submit' variant="success">Add Expense</Button>
          
        </div>
      </form>
      {expenseList.length > 0 && (
        <div className={classes.items}>
          <div className={classes.title}>
            <span>Type</span>
            <span>Amount</span>
            <span>Description</span>
          </div>
          {newExpenseList}
        </div>
      )}
    </React.Fragment>
  );
};


export default ExpenseForm;