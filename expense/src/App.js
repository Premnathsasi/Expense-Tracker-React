import React from "react";
import "./App.css";
import {useSelector} from 'react-redux'
import Profile from "./components/Profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import ExpenseForm from "./components/Pages/ExpenseForm";
import Header from "./components/Pages/Header";
import Welcome from "./components/Pages/Welcome";
// import AuthContext from "./components/Store/AuthContext";
import ForgotPasswordPage from "./components/Pages/ForgotPasswordPage";

function App() {
  // const authCtx = useContext(AuthContext);
  const auth = useSelector(state => state.auth.isAuthenticated)

  return (
    <React.Fragment>
      <Header />
      <Routes>
        {!auth && <Route path="/" element={<AuthForm />} />}
        {auth && <Route path="/welcome" element={<Welcome />} />}
        {auth && <Route path="/profile" element={<Profile />} />}
        {auth && <Route path="/expense" element={<ExpenseForm />} />}
        <Route path="/forgot" element={<ForgotPasswordPage/>} />
        {!auth ? <Route path='*' element={<Navigate to="/" />}/> : <Route path='*' element={<Navigate to="/welcome" />}/>}
      </Routes>
    </React.Fragment>
  );
}

export default App;
