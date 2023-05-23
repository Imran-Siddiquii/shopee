import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import { makeServer } from "./server";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
