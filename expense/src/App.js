import React, { useContext } from "react";
import "./App.css";
import Profile from "./components/Profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import ExpenseForm from "./components/Pages/ExpenseForm";
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
        {authCtx.isLoggedIn && <Route path="/expense" element={<ExpenseForm />} />}
        <Route path="/forgot" element={<ForgotPasswordPage/>} />
        <Route path='*' element={<Navigate to="/" />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
