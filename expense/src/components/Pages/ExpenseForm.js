import React, { useRef, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { useNavigate } from "react-router-dom";
import classes from "./ExpenseForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { expenseActions } from "../Store/ExpenseSlice";

const ExpenseForm = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const expenseList = useSelector(state => state.expense.expense);

  const amountRef = useRef();
  const typeRef = useRef();
  const descriptionRef = useRef();
  const email = JSON.parse(localStorage.getItem("email"));
  const cleanEmail = email.replace(/[@.]/g, "");

  const addExpenseHandler = async (event) => {
    event.preventDefault();
    try {
      let updatedList = {
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
        updatedList =  { id: data.name, ...updatedList }
        dispatch(expenseActions.addExpense([updatedList]))
        amountRef.current.value = "";
        typeRef.current.value = "";
        descriptionRef.current.value = "";
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
          newList.push({ id: key, ...data[key] });
        }
        dispatch(expenseActions.removeExpense(newList))
        console.log(newList);
      } catch (err) {
        console.log(err.message);
      }
    };
    getList();
  }, [cleanEmail, dispatch]);

  const edit = (item) => {  
    amountRef.current.value = item.amount;
    typeRef.current.value = item.type;
    descriptionRef.current.value = item.description;
    const updatedItemList = expenseList.filter((data) => data.id !== item.id);
    dispatch(expenseActions.removeExpense(updatedItemList));
  };

  const deleted = (id) => {
      const updatedItemList = expenseList.filter((data) => data.id !== id);
      dispatch(expenseActions.removeExpense(updatedItemList))
  };

  const goToWelcomeHandler = () => {
    Navigate("/welcome");
  };

  const newExpenseList = expenseList.map((item) => (
    <ExpenseItem item={item} key={item.id} edit={edit} deleted={deleted} />
  ));

  return (
    <React.Fragment>
      <div className={classes.body}>
        <form className={classes.form} onSubmit={addExpenseHandler}>
          <div className={classes.type}>
            <label>Expense Type: </label>
            <select className="form-select" ref={typeRef}>
              <option>Food</option>
              <option>Shopping</option>
              <option>Entertainment</option>
              <option>Tour</option>
              <option>Others</option>
            </select>
          </div>
          <div className={classes.amount}>
            <label>Expense Amount: </label>
            <input
              type="number"
              min="0"
              ref={amountRef}
              className="form-control"
            />
          </div>
          <div className={classes.description}>
            <label>Expense Description: </label>
            <textarea
              type="text"
              ref={descriptionRef}
              className="form-control"
            />
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
      </div>
    </React.Fragment>
  );
};

export default ExpenseForm;
