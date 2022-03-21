import { useRef, useState, useContext, Fragment } from "react";

import AuthContext from "../Auth/store/Auth-Context";

import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const authCtx = useContext(AuthContext);
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const ConfirmPassRef = useRef();

  const [isLogin, setIsLogin] = useState(props.isLogin); //To set form for login/signup

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const OnSubmitHandler = (event) => {
    event.preventDefault();
    const EnteredEmail = EmailRef.current.value;
    const EnteredPass = PasswordRef.current.value;
    let url = "";
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApjz11AMMnS_hq44BKtmnCIdCC5F0gIjI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApjz11AMMnS_hq44BKtmnCIdCC5F0gIjI";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: EnteredEmail,
        password: EnteredPass,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errormessage = "Email or Password Invalid";
            if (data && data.error && data.error.message) {
              errormessage = data.error.message;
            }
            throw new Error(errormessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        authCtx.setEmail(data.email);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <Fragment>
      <div className={classes.Auth}>
        <h1>{isLogin ? "Log in to your account" : "Sign Up"}</h1>
        <h2>
          {isLogin
            ? "Welcome back, Please login to your account."
            : "Please fill the details."}
        </h2>
        <form onSubmit={OnSubmitHandler}>
          <div className={classes.Control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={EmailRef} />
          </div>
          <div className={classes.Control}>
            <label htmlFor="password">
              {isLogin ? "Your Password" : "Create Password"}
            </label>
            <input type="password" id="password" required ref={PasswordRef} />
            {/* <i class="bi by-eye-slash"></i> */}
          </div>
          {!isLogin && (
            <div className={classes.Control}>
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="password"
                required
                ref={ConfirmPassRef}
              />
            </div>
          )}
          {isLogin && (
            <div className={classes.PassReset}>
              <button type="button">Forgot Password?</button>
            </div>
          )}
          <div className={classes.Actions}>
            <button>{isLogin ? "Login" : "Create Account"}</button>
          </div>
          <div className={classes.Toggle}>
            <label>
              {isLogin ? "Don't have an account?" : "Already have an account."}
            </label>
            <button type="button" onClick={switchAuthModeHandler}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AuthForm;
