import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./store/loginContext";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <LoginProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LoginProvider>,
  document.getElementById("root")
);
