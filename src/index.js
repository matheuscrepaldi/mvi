import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import App from "./App";
import "./index.css";
import { isLogin } from "./routes/isLoggedIn";
import "react-toastify/dist/ReactToastify.css";

const history = createBrowserHistory();

axios.defaults.baseURL = "https://cef-cloud-dev.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";

axios.interceptors.request.use(function (config) {
	const session = isLogin();
	config.headers.Authorization = session && session.token;
	config.params = config.params || {};
	config.params["cdOwner"] = session.owner;
	return config;
});

ReactDOM.render(
	<Router history={history}>
		<App />
		<ToastContainer autoClose={3000} />
	</Router>,
	document.getElementById("root")
);
