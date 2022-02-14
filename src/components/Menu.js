import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

import MenuImg from "../img/menu.svg";
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
		rgba(0, 117, 191, 1) 0%,
		rgba(13, 162, 255, 1) 44%,
		rgba(89, 191, 255, 1) 100%
	);
	height: 80px;
`;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	margin-right: 25px;
	width: 100%;
`;

const Logo = styled.div`
	display: flex;
	flex-flow: row;
	padding: 15px;

	@media (min-width: 1023px) {
		margin-left: 30px;
	}

	@media (max-width: 1023px) {
		width: 100%;
		justify-content: space-between;
	}
`;

const List = styled.div`
	display: flex;
	align-items: center;
	margin-right: 15px;
	height: 100%;

	@media (max-width: 1023px) {
		display: none;
	}
`;

const MenuHeader = styled.div`
	display: flex;
	flex-direction: row;
	display: flex;
	align-items: center;
	margin-right: 15px;
`;

const MenuIcon = styled.img`
	width: 45px;
	height: 45px;
	display: none;
	:hover {
		cursor: pointer;
	}

	@media (max-width: 1023px) {
		display: flex;
	}
`;

const MenuContainer = styled.div`
	height: 100%;
	width: 0;
	position: fixed; /* Stay in place */
	z-index: 999; /* Sit on top */
	left: 0;
	top: 0;
	background-color: #2c8dff;
	overflow-x: hidden;
	transition: 0.5s;

	@media (max-width: 767px) {
		display: flex;
		flex-direction: column;
	}
`;

const MenuLink = styled.a`
	padding: 15px;
	text-decoration: none;
	font-size: 36px;
	color: #fff;
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
`;

const MenuContent = styled.div`
	position: relative;
	top: 25%;
	width: 100%;
	text-align: center;
	margin-top: 30px;
`;

const Dropbtn = styled.button`
	color: #ffffff;
	height: 100%;
	font-size: 16px;
	border: none;
	min-width: 120px;
	background-color: transparent;
	background-repeat: no-repeat;
	overflow: hidden;
	outline: none;

	:hover {
		background: #0075bf;
	}
`;

const DropbtnItem = styled.button`
	color: #ffffff;
	height: 100%;
	text-align: start;
	font-size: 16px;
	border: none;
	cursor: pointer;
	background-color: transparent;
	background-repeat: no-repeat;
	overflow: hidden;
	outline: none;

	:hover {
		background: #0075bf;
	}
`;

const DropdownContent = styled.div`
	display: none;
	position: absolute;
	background: #59bfff;
	min-width: 160px;
	height: 40px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
	right: 0;
`;

const Dropdown = styled.div`
	position: relative;
	display: inline-block;
	height: 100%;

	:hover ${DropdownContent} {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
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
		showMenu();
		sessionStorage.removeItem("session");
	};

	const openNav = () => {
		document.getElementById("myNav").style.display = "flex";
		document.getElementById("myNav").style.width = "100%";
		document.getElementById("myNav").style.flexDirection = "column";
	};

	const closeNav = () => {
		document.getElementById("myNav").style.width = "0%";
	};
	const showMenu = () => {
		var x = document.getElementsByClassName("menu");
		var menu = x[0].style;
		if (menu.display === "none") {
			menu.display = "flex";
		} else {
			menu.display = "none";
		}
	};

	return (
		<>
			<Navbar>
				<Row>
					<Logo>
						<MenuHeader>
							<MenuIcon onClick={openNav} src={MenuImg} />
						</MenuHeader>
						<Title textWhite medium>
							{logged}
						</Title>
					</Logo>
					<List>
						<Dropbtn>
							<StyledLink to={"/home"}>Home</StyledLink>
						</Dropbtn>
						<Dropdown>
							<Dropbtn>
								<StyledLink to={""}>
									Gerenciar &#x25BC;
								</StyledLink>
							</Dropbtn>
							<DropdownContent>
								<DropbtnItem>
									<StyledLink to={"/clientes"}>
										Clientes
									</StyledLink>
								</DropbtnItem>
								<DropbtnItem>
									<StyledLink to={"/fornecedores"}>
										Fornecedores
									</StyledLink>
								</DropbtnItem>
								<DropbtnItem>
									<StyledLink to={"/movimentacoes"}>
										Movimentações
									</StyledLink>
								</DropbtnItem>
								<DropbtnItem>
									<StyledLink to={"/urnas"}>Urnas</StyledLink>
								</DropbtnItem>
							</DropdownContent>
						</Dropdown>
						{isAdmin && (
							<>
								<Dropbtn>
									<StyledLink to={"/funerarias"}>
										Funerárias
									</StyledLink>
								</Dropbtn>
								<Dropbtn>
									<StyledLink to={"/usuarios"}>
										Usuários
									</StyledLink>
								</Dropbtn>
								<Dropbtn>
									<StyledLink to={"/parametros"}>
										Parâmetros
									</StyledLink>
								</Dropbtn>
							</>
						)}
						<Dropbtn>
							<StyledLink to={""} onClick={handleLogout}>
								Sair
							</StyledLink>
						</Dropbtn>
					</List>
				</Row>
			</Navbar>

			<MenuContainer id="myNav" className="menu">
				<MenuLink className="closebtn" onClick={closeNav}>
					&times;
				</MenuLink>
				<MenuContent>
					<StyledLink onClick={showMenu} to={"/home"}>
						Home
					</StyledLink>
					<StyledLink onClick={showMenu} to={"/clientes"}>
						Clientes
					</StyledLink>
					<StyledLink onClick={showMenu} to={"/fornecedores"}>
						Fornecedores
					</StyledLink>
					<StyledLink onClick={showMenu} to={"/movimentacoes"}>
						Movimentações
					</StyledLink>
					<StyledLink onClick={showMenu} to={"/urnas"}>
						Urnas
					</StyledLink>
					{isAdmin && (
						<>
							<StyledLink onClick={showMenu} to={"/funerarias"}>
								Funerárias
							</StyledLink>
							<StyledLink onClick={showMenu} to={"/usuarios"}>
								Usuários
							</StyledLink>
							<StyledLink onClick={showMenu} to={"/parametros"}>
								Parâmetros
							</StyledLink>
						</>
					)}
					<StyledLink to={""} onClick={handleLogout}>
						Sair
					</StyledLink>
				</MenuContent>
			</MenuContainer>
		</>
	);
}

export default Menu;
