import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import loginContext from "../../store/loginContext";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loginCtx = useContext(loginContext);
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:" +
        "signInWithPassword?key=AIzaSyDWis5lUlyd8zSfvOlpWu0B5uYfCBnD67g";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:" +
        "signUp?key=AIzaSyDWis5lUlyd8zSfvOlpWu0B5uYfCBnD67g";
    }
    setIsLoading(true);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    try {
      if (response.ok) {
        const data = await response.json();
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        loginCtx.login(data.idToken, expirationTime.toISOString());
        console.log(data);
        history.replace("/");
      } else {
        const err = await response.json();
        let errorMessage = "Ooops.. Authentication Failed! :(";
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading. . .</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
