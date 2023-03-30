import React, { useRef, useState, useContext } from "react";
import classes from "./AuthForm.module.css";
import Spinner from "../UI/Spinner";
import { useNavigate, NavLink } from "react-router-dom";
import AuthContext from "../Store/AuthContext";

const AuthForm = () => {
  const Navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const authctx = useContext(AuthContext);

  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmpasswordInput = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredMail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;
    setisLoading(true);
    if (isLogin) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxQBeHpqU9pVy3f5hSwrxeCwgwLlTdXY8",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredMail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setisLoading(false);

        if (!response.ok) {
          let errMsg = "Authentication Failed";
          throw new Error(errMsg);
        }
        const data = await response.json();
        authctx.logIn(data.idToken);
        localStorage.setItem("email", JSON.stringify(data.email))
        Navigate("/welcome");
      } catch (err) {
        alert(err.message);
      }
    } else {
      const enteredConfirmPassword = confirmpasswordInput.current.value;
      if (enteredPassword !== enteredConfirmPassword) {
        alert("Password does not match with confirm password");
        setisLoading(false);
      } else {
        try {
          const res = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxQBeHpqU9pVy3f5hSwrxeCwgwLlTdXY8",
            {
              method: "POST",
              body: JSON.stringify({
                email: enteredMail,
                password: enteredPassword,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setisLoading(false);

          if (!res.ok) {
            let errMsg = "Authentication Failed";
            throw new Error(errMsg);
          }
          const data = await res.json();
          console.log("User has successfully signed up");
          alert('Account Created successfully')
          setIsLogin(true)
        } catch (error) {
          alert(error.message);
        }
      }
    }
    emailInput.current.value= "";
    passwordInput.current.value= "";


  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <div className={classes.main}>
    
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          {/* <label htmlFor="email">Your Email</label> */}
          <input
            type="email"
            id="email"
            required
            ref={emailInput}
            placeholder="Email"
          ></input>
        </div>
        <div className={classes.control}>
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            id="password"
            required
            ref={passwordInput}
            placeholder="Password"
          ></input>
        </div>
        {!isLogin && (
          <div className={classes.control}>
            {/* <label htmlFor="confirmpassword">Confirm Password</label> */}
            <input
              type="password"
              id="confirmpassword"
              required
              ref={confirmpasswordInput}
              placeholder="Confirm Password"
            ></input>
          </div>
        )}
        <div className={classes.control}>
        {isLogin && <div><NavLink  className="text-dark" to="/forgot">Forgot Password ?</NavLink></div>}
          </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <Spinner />}
          <br/>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Already have an account! Login"}
          </button>
        </div>
      </form>
      </div>
    </section>
  );
};

export default AuthForm;
