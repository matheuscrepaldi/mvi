import React from "react";
import styled from "styled-components";
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

	&.selected,
	:hover {
		background: #0075bf;
	}
`;

function Menu() {
	const session = isLogin();
	const user = session.nome.toUpperCase();

	const handleLogout = () => {
		sessionStorage.removeItem("session");
		sessionStorage.removeItem("total");
		sessionStorage.removeItem("Fiis");
		sessionStorage.removeItem("Ações");
		sessionStorage.removeItem("Renda Fixa");
		sessionStorage.removeItem("Criptos");
		sessionStorage.removeItem("ETFs");
		sessionStorage.removeItem("Stocks");
	};

	const path = window.location.pathname;

	return (
		<Navbar>
			<Row>
				<Row style={{ width: "20%", paddingLeft: 20 }}>
					<Title textWhite>{`Olá, ${user}`}</Title>
				</Row>
				<Row style={{ justifyContent: "center" }}>
					<Dropbtn className={path === "/dashboard" && "selected"}>
						<StyledLink to={"/dashboard"}>Dashboard</StyledLink>
					</Dropbtn>
					<Dropbtn className={path === "/metas" && "selected"}>
						<StyledLink to={"/metas"}>Metas</StyledLink>
					</Dropbtn>
					<Dropbtn className={path === "/transacoes" && "selected"}>
						<StyledLink to={"/transacoes"}>Transações</StyledLink>
					</Dropbtn>
					<Dropbtn
						className={path === "/rebalanceamento" && "selected"}
					>
						<StyledLink to={"/rebalanceamento"}>
							Rebalanceamento
						</StyledLink>
					</Dropbtn>
					<Dropbtn className={path === "/mdi" && "selected"}>
						<StyledLink to={"/mdi"}>MDI</StyledLink>
					</Dropbtn>
					<Dropbtn className={path === "/alertas" && "selected"}>
						<StyledLink to={"/alertas"}>Alertas</StyledLink>
					</Dropbtn>
				</Row>
				<List style={{ width: "20%" }}>
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
