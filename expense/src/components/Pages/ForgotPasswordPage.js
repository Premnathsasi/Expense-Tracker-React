import React , {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Spinner from "../UI/Spinner";

const ForgotPasswordPage = () => {
    const [isLoading, setLoading] = useState(false)
    const emailInput = useRef();

    const Navigate = useNavigate();

    const backToLoginHandler = () => {
        Navigate('/')
    };

    const forgotPasswordHandler = async() => {
        try {
            const enteredMail =  emailInput.current.value;
            setLoading(true)
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAxQBeHpqU9pVy3f5hSwrxeCwgwLlTdXY8",
            {
                method: "POSt",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email:enteredMail,
                }) 
            })
            setLoading(false)
            const data = await response.json();

            if (!response.ok){
                let errMsg = "Reset Password Failed";
            throw new Error(errMsg);
            } else{
                alert(`Reset link sent to ${data.email}`)
                Navigate("/")
            }

        } catch(err){
            alert(err.message)
        };
    };

  return (
    <React.Fragment>
      <div className="bg-white"> 
        
    <h2 className="text-center bg-success p-3 text-white">Forgot Password</h2>
    <Container className="col-5 mt-5">    
        <form>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label fw-bold text-left">
              Email address:
            </label>
            <input
              type="email"
              ref={emailInput}
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div className="d-grid gap-2">
            {!isLoading && <Button variant="warning" className="text-white rounded-pill mb-4" type="submit" onClick={forgotPasswordHandler}>Send link</Button>}
            {isLoading && <Spinner />}
          </div>
          <div>
            <Button variant="outline-secondary" onClick={backToLoginHandler}>Back to login Page</Button>
          </div>
        </form>
      </Container>

      </div>
    </React.Fragment>
  );
};

export default ForgotPasswordPage;
