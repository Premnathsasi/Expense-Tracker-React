import React, {useState} from "react";
import Profile from "./Profile/Profile";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const Navigate = useNavigate();
    const [editProfile, setEditProfile] = useState(false);
    const editProfileHandler = () => {
        setEditProfile(true);
        Navigate('/profile')

    }

  return (
    <React.Fragment>
      <h1 className="bg-dark text-white p-3">Welcome to Expense Tracker!!!</h1>
      {!editProfile && <div className="ms-5"><p>Your profile is incomplete</p> <Button  onClick={editProfileHandler}>Complete now</Button></div>}
    </React.Fragment>
  );
};

export default Welcome;
