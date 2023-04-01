import React from "react";
import { Button } from "react-bootstrap";

import classes from "./ExpenseItems.module.css";

const ExpenseItem = (props) => {
  const email = JSON.parse(localStorage.getItem("email"));
  const cleanEmail = email.replace(/[@.]/g, "");

    const editHandler = async() => {
      try{
        const res = await fetch(`https://expensetracker-8a83d-default-rtdb.firebaseio.com/${cleanEmail}expense/${props.item.id}.json`,{
          method: 'DELETE'
        })

        if(res.ok) {
          console.log('deleted successfully');
          props.edit(props.item);
        }
      }
      catch(err) {
        console.log(err.message)
      }
    };
  

    const deleteHandler = async() => {
      try{
        const res = await fetch(`https://expensetracker-8a83d-default-rtdb.firebaseio.com/${cleanEmail}expense/${props.item.id}.json`,{
          method: 'DELETE'
        })

        if(res.ok) {
          console.log('deleted successfully');
          props.deleted(props.item.id)        }
      }
      catch(err) {
        console.log(err.message)
      }
  };


  return (
    <React.Fragment>
      <div className={classes.item}>
        <span>{props.item.type}</span>
        <span>₹{props.item.amount}</span>
        <span>{props.item.description}</span>
        <Button variant="success" onClick={editHandler}>Edit</Button>
          <Button variant="danger" className="ms-2" onClick={deleteHandler}>Delete</Button>
      </div>
    </React.Fragment>
  );
};

export default ExpenseItem;
