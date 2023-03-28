import React, {useRef, useState} from "react";
import classes from './AuthForm.module.css';
import Spinner from "../UI/Spinner";

const AuthForm = () => {
    const [isLoading, setisLoading] = useState(false);


const emailInput = useRef();
const passwordInput = useRef();
const confirmpasswordInput = useRef();

const submitHandler = async(e) => {
    e.preventDefault();
    const enteredMail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;
    const enteredConfirmPassword = confirmpasswordInput.current.value;
    setisLoading(true)
    try {
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxQBeHpqU9pVy3f5hSwrxeCwgwLlTdXY8",
        {
            method: "POST",
            body: JSON.stringify({
                email:enteredMail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                "Content-Type": "application/json",
              },
        })
        setisLoading(false)

        if (!response.ok) {
            let errMsg = 'Authentication Failed';
                throw new Error(errMsg)
        }
        const data = await response.json();
        console.log('User has successfully signed up')

    } catch(error) {
        alert(error.message)
    }

}

  return (
        <section className={classes.auth}>
            <h2>Sign Up</h2>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email:</label>
                    <input type='email' id="email" required placeholder="Email" ref={emailInput}></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password:</label>
                    <input type='password' id="password" required placeholder="password" ref={passwordInput}></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type='password' id="confirmpassword" required placeholder="confirm password" ref={confirmpasswordInput}></input>
                </div>
                <div className={classes.actions}>
                    {!isLoading && <button>Sign Up</button>}
                    {isLoading && <Spinner />}
                    </div>
            </form>
        </section>
    
  );
};


export default AuthForm;