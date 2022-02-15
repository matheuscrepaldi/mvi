import React, { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import styled from "styled-components";
import Button from "../components/Button";
import { Input } from "../components/Input";
import Loading from "../components/Loading";
import img from "../img/background.jpeg";
import LogoImage from "../img/mvi.png";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-image: url(${img});
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
`;

const StyledCardFront = styled.div`
	display: flex;
	background: #ffffff;
	border-radius: 10px;
	box-shadow: 0 10px 40px -14px rgba(99, 83, 83, 0.25);
	padding: 30px;
	margin: 10px;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	width: 400px;
	height: 70vh;
	border-radius: 20px;

	overflow: hidden;
	position: absolute;
	z-index: 3;
	transform: rotate(0deg);
	-moz-transform: rotate(0deg);
	transition: 1s transform;
	transform-style: preserve-3d;
	backface-visibility: hidden;

	&.flip {
		transform: rotateY(180deg);
		-moz-transform: rotateY(180deg);
	}
`;

const StyledCardBack = styled.div`
	display: flex;
	background: #ffffff;
	border-radius: 10px;
	box-shadow: 0 10px 40px -14px rgba(99, 83, 83, 0.25);
	padding: 30px;
	margin: 10px;
	flex-flow: column;
	justify-content: flex-start;
	align-items: center;
	width: 400px;
	height: 70vh;
	border-radius: 20px;

	overflow: hidden;
	position: absolute;
	z-index: 1;
	transform: rotateY(-180deg);
	-moz-transform: rotateY(-180deg);
	transition: 1s transform;
	transform-style: preserve-3d;
	backface-visibility: hidden;

	&.flip {
		transform: rotateY(0deg);
		-moz-transform: rotateY(0deg);
	}
`;

const Row = styled.div`
	display: flex;
	width: 100%;
	margin: 10px;
`;

const Version = styled.span`
	position: absolute;
	bottom: 10px;
	color: #ccc;
`;

const ButtonLogin = styled(Button)`
	background-color: #1f75c4;

	:hover {
		background-color: #0a2640;
	}
`;

function LoginPage(props) {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [card, setCard] = useState("login");

	useEffect(() => {
		const session = JSON.parse(sessionStorage.getItem("session"));

		if (session && session.status === 200) {
			props.history.push("/home");
		}

		setLoading(false);
	}, [props.history]);

	function handleUserChange(e) {
		setUser(e.target.value);
	}

	function handleEmailChange(e) {
		setEmail(e.target.value);
	}

	function handlePasswordChange(e) {
		setPassword(e.target.value);
	}

	async function handleLoginFormSubmit() {
		if (email === "" || password === "") {
			toast.error("Por favor, informe usuário e senha");
			return;
		}

		const body = {
			usu_nome: email,
			usu_senha: password,
		};

		setLoading(true);

		axios
			.post("login", body)
			.then(function (response) {
				const status = response.status || {};
				if (status === 200) {
					const data = response.data || {};
					const isAdmin = data.Role === "ROLE_ADMIN";

					const session = {
						user: email,
						nome: user,
						token: data.Token,
					};

					sessionStorage.setItem("session", JSON.stringify(session));
					setLoading(false);
					props.history.push("/home");
				} else {
					setLoading(false);
					toast.error("Erro ao realizar login");
				}
			})
			.catch(function (error) {
				setLoading(false);
				console.log(error);
				toast.error("Erro ao realizar login");
			});
	}

	async function handleCreateUser() {
		//to do
		console.log("cadsatrar usuario");
	}

	return (
		<Container>
			<StyledCardFront className={card === "cadastro" && "flip"}>
				<Loading loading={loading} absolute />
				<Row style={{ justifyContent: "center" }}>
					<img
						src={LogoImage}
						width="150px"
						height="150px"
						alt="logo"
					/>
				</Row>
				<Row>Email</Row>
				<Row>
					<Input onChange={handleEmailChange} />
				</Row>
				<Row>Senha</Row>
				<Row>
					<Input onChange={handlePasswordChange} type="password" />
				</Row>
				<Row style={{ justifyContent: "center" }}>
					<ButtonLogin onClick={handleLoginFormSubmit}>
						Entrar
					</ButtonLogin>
				</Row>
				<Row style={{ justifyContent: "center" }}>
					<a href="#" onClick={() => setCard("cadastro")}>
						Registrar-se
					</a>
				</Row>
				<Version>v1.0.0</Version>
			</StyledCardFront>

			<StyledCardBack className={card === "cadastro" && "flip"}>
				<Loading loading={loading} absolute />
				<Row style={{ justifyContent: "center" }}>
					<img
						src={LogoImage}
						width="150px"
						height="150px"
						alt="logo"
					/>
				</Row>
				<Row>Nome</Row>
				<Row>
					<Input onChange={handleUserChange} />
				</Row>
				<Row>Email</Row>
				<Row>
					<Input onChange={handleEmailChange} />
				</Row>
				<Row>Senha</Row>
				<Row>
					<Input onChange={handlePasswordChange} type="password" />
				</Row>
				<Row style={{ justifyContent: "center" }}>
					<ButtonLogin onClick={() => setCard("login")}>
						Voltar
					</ButtonLogin>
					<ButtonLogin onClick={handleCreateUser}>
						Registrar
					</ButtonLogin>
				</Row>
				<Version>v1.0.0</Version>
			</StyledCardBack>
		</Container>
	);
}

export default LoginPage;
