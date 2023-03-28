import React, {useContext} from "react";
import "./App.css";
import { Routes, Route} from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import ExpenseTracker from "./components/ExpenseTracker";
import AuthContext from "./components/Store/AuthContext";

function App() {
  const authCtx = useContext(AuthContext)

  return (
    <React.Fragment>
      <Routes>
      {authCtx.isLoggedIn && <Route path="/et" element={<ExpenseTracker />} />}
      <Route path="/" element={<AuthForm />} />
      </Routes>
     
    </React.Fragment>
  );
}

export default App;
