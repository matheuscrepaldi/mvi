import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
	return (
		<Router>
			<Switch>
				<PublicRoute
					restricted={false}
					component={Login}
					path="/"
					exact
				/>

				<Layout>
					<Switch>
						<PrivateRoute
							component={Home}
							path="/dashboard"
							exact
						/>
					</Switch>
				</Layout>
			</Switch>
		</Router>
	);
}

export default App;
