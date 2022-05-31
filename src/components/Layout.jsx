import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "../styles/theme";
import Menu from "./Menu";

const Container = styled.div`
	min-height: 100vh;
	max-height: 100vh;
	overflow: hidden;
	background: #e5e5e5;
	display: flex;
	flex-direction: column;
	margin: 0;
`;

const Body = styled.div`
	flex-grow: 1;
	padding: 30px;
	max-width: 100%;
	margin-top: 50px;
	height: calc(100vh - 50px);
	overflow: auto;
	overflow-x: hidden;
`;

function Layout(props) {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	return (
		<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
			<Container>
				<Menu handleTheme={() => setIsDarkTheme(!isDarkTheme)} />
				<Body id="container">{props.children}</Body>
			</Container>
		</ThemeProvider>
	);
}
export default withRouter(Layout);
