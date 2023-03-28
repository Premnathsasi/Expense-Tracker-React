import React, {useContext, useRef} from "react";
import AuthContext from "../Store/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub} from "@fortawesome/free-brands-svg-icons"
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import {Button, Container} from "react-bootstrap";
const Profile = () => {
const authCtx = useContext(AuthContext);
const nameInput = useRef();
const photoInput = useRef();

const submitHandler= async(e) => {
    e.preventDefault();
    const enteredName = nameInput.current.value;
    const enteredPhtoUrl = photoInput.current.value;
    console.log(authCtx.token)

    try {
        const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAxQBeHpqU9pVy3f5hSwrxeCwgwLlTdXY8",
        {
            method:"POSt",
            body: JSON.stringify({
                idToken: authCtx.token,
                displayName:enteredName,
                photoUrl:enteredPhtoUrl,
                returnSecureToken:true
            })
        })
        if (!res.ok) {
            let errMsg = "Update Failed";
          throw new Error(errMsg);
        }
        const data = await res.json();
        console.log(data)
    }catch(err) {
        alert(err.message);

    }
    nameInput.current.value = "";
    photoInput.current.value = "";
}
    return (
        <React.Fragment>
            <Container className="border border-dark p-5">
            <form className='d-flex col-8 text-center align-items-end' onSubmit={submitHandler}>
                <h3>Contact Details</h3>
                <div>
                <FontAwesomeIcon icon={faGithub} className="fa-3x pe-2"/>
                <label htmlFor="name" className="mb-3 fw-bold">Full Name:</label>
                <input type='text' id="name" ref={nameInput}></input>
                </div>
                <div>
                <FontAwesomeIcon icon={faGlobe} className="fa-3x pe-2"/>
                <label htmlFor="url" className="mb-3 fw-bold">Profile Photo Url:</label>
                <input type='text' id="url" ref={photoInput}></input>
                </div>
                <div>
                <Button variant="dark" type="submit" size="lg">Update</Button>
                </div>
            </form>
            </Container>
            
        </React.Fragment>
    )
}

export default Profile;