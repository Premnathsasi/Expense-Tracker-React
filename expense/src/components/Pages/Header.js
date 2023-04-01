import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/AuthSlice";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const Header = () =>{
    const [emailVerified, setVerified] = useState(false)
    const auth =  useSelector(state => state.auth.isAuthenticated)
    const Navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'));
    const dispatch = useDispatch();


    const editProfileHandler = () => {
    Navigate("/profile");
  };

  useEffect(() => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAxQBeHpqU9pVy3f5hSwrxeCwgwLlTdXY8`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
       const verified = data.users[0].emailVerified;
       if (verified === true){
        setVerified(true)
       }
      });
  },[]);

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
            idToken:token,
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
    dispatch(authActions.logout())
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    Navigate("/");
  };
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="fs-2 me-5">Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
       {auth && <Navbar.Collapse id="responsive-navbar-nav">
          <Nav.Link className="me-auto">
          {!emailVerified && <Button variant="success" onClick={emailVerifyHandler}>
            Verify Email
          </Button>}
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
        </Navbar.Collapse> }
      </Container>
    </Navbar>
        </React.Fragment>
    )
};

export default Header;