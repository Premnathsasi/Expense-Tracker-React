import React, {useState} from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    logIn: (token) => {},
    logOut: () => {}
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken)

    const userLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token',token);
    };

    const logOutHandler = () => {
        setToken(null);
        localStorage.removeItem('token')
        localStorage.removeItem('email')
    };

    const contextValue = {
        token: token,
        isLoggedIn: userLoggedIn,
        logIn:loginHandler,
        logOut:logOutHandler
    };

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthContext;

