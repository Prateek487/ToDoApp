import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  setEmail : (email) => {},
  removeEmail : () => {}
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  const isLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };
  const setEmailHandler = (email) => {
    setEmail(email);
  };

  const removeEmailHandler = () => {
    setEmail(null);
  };

  const contextValue = {
    token: token,
    email : email,
    isLoggedIn: isLoggedIn,
    setEmail : setEmailHandler,
    removeEmail : removeEmailHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
