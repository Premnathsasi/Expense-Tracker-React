import React from "react";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classes from './Welcome.module.css';

const Welcome = () => {
  const Navigate = useNavigate();
  const goToExpenseHandler = () => {
    Navigate("/expense")
  }

  return (
    <React.Fragment>
    <div className={classes.body}>
      <Button onClick={goToExpenseHandler} className={classes.btn}>Add your Expenses</Button>
    </div>
    </React.Fragment>
  );
};

export default Welcome;
