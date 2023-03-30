import React, { useRef, useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { useNavigate } from "react-router-dom";
import classes from "./ExpenseForm.module.css";
import { Button } from "react-bootstrap";

const ExpenseForm = () => {
  const Navigate = useNavigate();
  const [expenseList, setExpenseList] = useState([]);

  const amountRef = useRef();
  const typeRef = useRef();
  const descriptionRef = useRef();
  const email = JSON.parse(localStorage.getItem("email"));
  const cleanEmail = email.replace(/[@.]/g, "");

  const addExpenseHandler = async (event) => {
    event.preventDefault();
    try {
      const updatedList = {
        amount: amountRef.current.value,
        type: typeRef.current.value,
        description: descriptionRef.current.value,
      };
      const response = await fetch(
        `https://expensetracker-8a83d-default-rtdb.firebaseio.com/${cleanEmail}expense.json`,
        {
          method: "POST",
          body: JSON.stringify({
            amount: amountRef.current.value,
            type: typeRef.current.value,
            description: descriptionRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Added successfully");
        setExpenseList((prev) => [...prev, updatedList]);
      } else {
        let errMsg = "Adding Expenses Failed";
        throw new Error(errMsg);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await fetch(
          `https://expensetracker-8a83d-default-rtdb.firebaseio.com/${cleanEmail}expense.json`
        );

        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();

        const newList = [];
        for (const key in data) {
          newList.push(data[key]);
        }
        setExpenseList(newList);
      } catch (err) {
        console.log(err.message);
      }
    };
    getList();
  }, [cleanEmail]);

  const goToWelcomeHandler = () => {
    Navigate("/welcome");
  };

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
          <input type="number" min="0" ref={amountRef} />
        </div>
        <div className={classes.description}>
          <label>Expense Description: </label>
          <textarea type="text" ref={descriptionRef} />
        </div>
        <div className={classes.button}>
          <Button variant="danger" onClick={goToWelcomeHandler}>
            Close
          </Button>
          <Button type="submit" variant="success">
            Add Expense
          </Button>
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
