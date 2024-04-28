import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import allReducers from "./reducers/index";
import { Provider } from "react-redux";
import {thunk} from 'redux-thunk';
const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(
  allReducers,
  applyMiddleware(thunk)
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
