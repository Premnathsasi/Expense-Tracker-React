import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "./Store/AuthContext";
import classes from './Welcome.module.css';

const Welcome = () => {
  const authCtx = useContext(AuthContext);
  const Navigate = useNavigate();
  const editProfileHandler = () => {
    Navigate("/profile");
  };

  const emailVerifyHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAxQBeHpqU9pVy3f5hSwrxeCwgwLlTdXY8",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.token,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert(`Verification code sent to ${data.email}`);
      } else {
        let errMsg = "Verification Failed";
        throw new Error(errMsg);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const logoutHandler = () => {
    authCtx.logOut();
    Navigate("/");
  };
  const goToExpenseHandler = () => {
    Navigate("/expense")
  }

  return (
    <React.Fragment>
       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="fs-3 me-5">Welcome to Expense Tracker!!!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav.Link className="me-auto">
          <Button variant="success" onClick={emailVerifyHandler}>
            Verify Email
          </Button>
          </Nav.Link>
          <Nav>
            <Nav.Link className="d-flex">
            <p className="me-2 text-white">Your profile is incomplete</p>
            <Button variant="secondary" onClick={editProfileHandler} className="me-3">
              Complete now
            </Button>
            </Nav.Link>
            <Nav.Link>
            <Button className="ms-5" onClick={logoutHandler}>Logout</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className={classes.body}>
      <Button onClick={goToExpenseHandler} className={classes.btn}>Add your Expenses</Button>
    </div>
    </React.Fragment>
  );
};

export default Welcome;
