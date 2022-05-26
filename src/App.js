import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Rebalanceamento from "./pages/Rebalanceamento";
import Mdi from "./pages/Mdi";
import Alertas from "./pages/Alertas";
import Transacoes from "./pages/Transacoes";

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
						<PrivateRoute
							component={Rebalanceamento}
							path="/rebalanceamento"
							exact
						/>
						<PrivateRoute component={Mdi} path="/mdi" exact />
						<PrivateRoute
							component={Alertas}
							path="/alertas"
							exact
						/>
						<PrivateRoute
							component={Transacoes}
							path="/transacoes"
							exact
						/>
					</Switch>
				</Layout>
			</Switch>
		</Router>
	);
}

export default App;
