import React, { useContext } from "react";
import "./App.css";
import Profile from "./components/Profile/Profile";
import { Routes, Route } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Welcome from "./components/Welcome";
import AuthContext from "./components/Store/AuthContext";
import ForgotPasswordPage from "./components/Pages/ForgotPasswordPage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        {authCtx.isLoggedIn && <Route path="/welcome" element={<Welcome />} />}
        {authCtx.isLoggedIn && <Route path="/profile" element={<Profile />} />}
        <Route path="/forgot" element={<ForgotPasswordPage/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
