import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
// import { AuthContextProvider } from './components/Store/AuthContext';
import { Provider } from "react-redux";
import App from './App';
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import store from './components/Store/ReduxStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);


