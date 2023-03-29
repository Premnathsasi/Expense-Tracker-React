import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "./Store/AuthContext";

const Welcome = () => {
  const authCtx = useContext(AuthContext);
  const Navigate = useNavigate();
  const [editProfile, setEditProfile] = useState(false);
  const editProfileHandler = () => {
    setEditProfile(true);
    Navigate("/profile");
  };

  const emailVerifyHandler = async() => {
    try {
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAxQBeHpqU9pVy3f5hSwrxeCwgwLlTdXY8",
      { 
        method: "POST",
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken:authCtx.token
        })
      })
      const data = await response.json();

      if(response.ok) {
        alert(`Verification code sent to ${data.email}`)
      } else {
        let errMsg = "Verification Failed";
          throw new Error(errMsg);
      }

    }catch(err) {
      alert(err.message)
    }
  };

  const logoutHandler = () => {
    authCtx.logOut();
    Navigate('/')
  };

  return (
    <React.Fragment>
      <div className="bg-dark text-white d-flex justify-content-between align-items-center">
        <span className="h1 ms-3">Welcome to Expense Tracker!!!</span>
        <span>
          <Button variant="success" onClick={emailVerifyHandler}>Verify Email</Button>
        </span>
        <span className="me-3">
          <Button onClick={logoutHandler}>Logout</Button>
        </span>
      </div>
      {!editProfile && (
        <div className="ms-5">
          <p>Your profile is incomplete</p>{" "}
          <Button onClick={editProfileHandler}>Complete now</Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default Welcome;
