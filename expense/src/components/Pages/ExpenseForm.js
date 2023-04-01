import React, { useRef, useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import { useNavigate } from "react-router-dom";
import classes from "./ExpenseForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { expenseActions } from "../Store/ExpenseSlice";
import { themeActions } from "../Store/ThemeSlice";

const ExpenseForm = () => {
  const [activatePremium, setActivatePremium] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const expenseList = useSelector((state) => state.expense.expense);
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const themeMode = useSelector((state) => state.theme.theme);

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
        updatedList = { id: data.name, ...updatedList };
        dispatch(
          expenseActions.addExpense({
            expense: [updatedList],
            totalAmount: updatedList.amount,
          })
        );
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

        let newList = [];
        let totalAmount = 0;
        for (const key in data) {
          newList.push({ id: key, ...data[key] });
          totalAmount = Number(totalAmount) + Number(data[key].amount);
        }
        dispatch(
          expenseActions.removeExpense({
            expense: newList,
            totalAmount: totalAmount,
          })
        );
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
    const updatedAmount = totalAmount - Number(item.amount);
    const updatedItemList = expenseList.filter((data) => data.id !== item.id);
    dispatch(
      expenseActions.removeExpense({
        expense: updatedItemList,
        totalAmount: updatedAmount,
      })
    );
  };

  const deleted = (item) => {
    const updatedAmount = totalAmount - Number(item.amount);
    const updatedItemList = expenseList.filter((data) => data.id !== item.id);
    dispatch(
      expenseActions.removeExpense({
        expense: updatedItemList,
        totalAmount: updatedAmount,
      })
    );
  };

  const goToWelcomeHandler = () => {
    Navigate("/welcome");
  };

  const newExpenseList = expenseList.map((item) => (
    <ExpenseItem item={item} key={item.id} edit={edit} deleted={deleted} />
  ));

    // activating premium membership
    const activatePremiumHandler = () => {
      setActivatePremium((preState) => {
        if (preState) {
          dispatch(themeActions.lightTheme());
          return !preState;
        } else {
          dispatch(themeActions.darkTheme());
          return !preState;
        }
      });
    };
  
    // creating the csv file to download
    const title = ['Category', 'Description', 'Amount' ];
    const data = [title];
  
    expenseList.forEach((item) => {
      data.push([item.type, item.description, item.amount]);
    });
  
    const creatingCSV = data.map((row) => row.join(',')).join('\n');
    const blob = new Blob([data]);
  
    // dark mode handler
    const darkModeHandler = () => {
      if (themeMode === 'light') {
        dispatch(themeActions.darkTheme());
      } else {
        dispatch(themeActions.lightTheme());
      }
    };
  
    if (totalAmount < 10000 && themeMode === 'dark') {
      setActivatePremium(false);
      dispatch(themeActions.lightTheme());
    }

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center p-2">
      {totalAmount > 10000 && (
          <div className={classes.activate}>
            <Button variant={activatePremium ? 'danger' : 'warning'} onClick={activatePremiumHandler}>
              {activatePremium ? 'Deactivate Premium' : 'Activate Premium'}
            </Button>
            {activatePremium && (
              <Button className="ms-3" variant={themeMode === 'light' ? 'dark' : 'light'} onClick={darkModeHandler}>
                {themeMode === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
            )}
          </div>
        )}
      </div>
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
              {totalAmount > 10000 && activatePremium && (
                <a className={classes.a} href={URL.createObjectURL(blob)} download='expenses.csv'>
                  Download
                </a>
              )}
            </div>
            {newExpenseList}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ExpenseForm;
