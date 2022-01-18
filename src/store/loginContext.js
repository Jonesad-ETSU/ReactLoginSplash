import { createContext, useCallback, useEffect, useState } from "react";

let logoutTimer;

const loginContext = createContext({
  isLoggedIn: false,
  authToken: "",
  login: (token) => {},
  logout: () => {},
});

const pullTokens = () => {
  const storedToken = localStorage.getItem("token");
  const storedRemaining = localStorage.getItem("timeRemaining");
  const timeRemaining = calculateRemainingTime(storedRemaining);
  if (timeRemaining <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("timeRemaining");
    return null;
  }

  return {
    token: storedToken,
    duration: timeRemaining,
  };
};

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  return adjExpirationTime - currentTime;
};

export const LoginProvider = (props) => {
  const tokenData = pullTokens();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
    //initialToken = localStorage.getItem("token");
  }
  const [token, setToken] = useState(initialToken);
  const isLoggedIn = !!token;
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("timeRemaining", expirationTime);

    logoutTimer = setTimeout(
      logoutHandler,
      //3000
      calculateRemainingTime(expirationTime)
    );
  };
  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("timeRemaining");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  },[]);

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  return (
    <loginContext.Provider
      value={{
        token: token,
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </loginContext.Provider>
  );
};

export default loginContext;
