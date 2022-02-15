import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

import { isLogin } from "../routes/isLoggedIn";
import Title from "./Title";

const StyledLink = styled(Link)`
	color: #ffffff;
	text-decoration: none;
	margin: 0px 10px;

	@media (max-width: 1023px) {
		padding: 15px;
		text-decoration: none;
		font-size: 36px;
		display: block;
		transition: 0.3s;
		font-family: Poppins;
		font-style: normal;
		font-weight: 600;
		font-size: 18px;
		line-height: 22px;

		&.closebtn {
			display: flex;
			justify-content: flex-start;
			margin: 10px;
			font-size: 45px;
		}

		:hover {
			color: #d9d9d9;
			cursor: pointer;
		}
	}
`;

const Navbar = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	margin: auto;
	width: 100%;
	background: linear-gradient(
		90deg,
		rgba(31, 117, 196, 1) 0%,
		rgba(10, 38, 64, 1) 100%
	);
	height: 50px;
`;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	margin-right: 25px;
	width: 100%;
`;

const List = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 100%;
`;

const Dropbtn = styled.button`
	color: #ffffff;
	height: 100%;
	font-size: 16px;
	border: none;
	border-radius: 8px;
	min-width: 120px;
	background-color: transparent;
	background-repeat: no-repeat;
	overflow: hidden;
	outline: none;

	:hover {
		background: #0075bf;
	}
`;

function Menu() {
	const session = isLogin();
	const isAdmin = session && session.role === "ROLE_ADMIN";
	const [logged, setLogged] = useState("");

	useEffect(() => {
		if (isAdmin) {
			axios
				.get(`listarFunerariaById/${session.owner}`)
				.then(function (response) {
					const data = response.data || {};
					setLogged(data.nome_owner.toUpperCase());
				})
				.catch(function (error) {
					console.log(error);
				});
		} else {
			setLogged(`Olá, ${session.user.toUpperCase()}`);
		}
	}, []);

	const handleLogout = () => {
		sessionStorage.removeItem("session");
	};

	return (
		<Navbar>
			<Row>
				<Row style={{ width: "20%", paddingLeft: 20 }}>
					<Title textWhite>{logged}</Title>
				</Row>
				<Row style={{ justifyContent: "center" }}>
					<StyledLink to={"/home"}>1</StyledLink>
					<StyledLink to={"/home"}>2</StyledLink>
					<StyledLink to={"/home"}>3</StyledLink>
				</Row>
				<List style={{ width: "20%" }}>
					<Dropbtn>
						<StyledLink to={"/home"}>Home</StyledLink>
					</Dropbtn>
					<Dropbtn>
						<StyledLink to={""} onClick={handleLogout}>
							Sair
						</StyledLink>
					</Dropbtn>
				</List>
			</Row>
		</Navbar>
	);
}

export default Menu;
