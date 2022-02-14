import React, { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import styled from "styled-components";
import Button from "../components/Button";
import { Input } from "../components/Input";
import Loading from "../components/Loading";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const StyledCard = styled.div`
	display: flex;
	background: #ffffff;
	border-radius: 10px;
	box-shadow: 0 10px 40px -14px rgba(0, 0, 0, 0.25);
	padding: 30px;
	margin: 10px;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	width: 400px;
	height: 500px;
	border-radius: 20px;
	z-index: 0;
	overflow: hidden;
	position: relative;
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

function LoginPage(props) {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const session = JSON.parse(sessionStorage.getItem("session"));

		if (session && session.status === 200) {
			props.history.push("/home");
		}

		setLoading(false);
	}, [props.history]);

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
			username: email,
			password,
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
						status,
						token: data.Token,
						owner: isAdmin ? "" : data.Owner,
						role: data.Role,
						funeraria: data.Funeraria,
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

	return (
		<Container>
			<StyledCard>
				<Loading loading={loading} absolute />
				{/* <Row style={{ marginBottom: 50 }}>
					<img src={LogoImage} width="100%" height="40" alt="logo" />
				</Row> */}
				<Row>Usuário</Row>
				<Row>
					<Input onChange={handleEmailChange} />
				</Row>
				<Row>Senha</Row>
				<Row>
					<Input onChange={handlePasswordChange} type="password" />
				</Row>
				<Row style={{ justifyContent: "center" }}>
					<Button onClick={handleLoginFormSubmit}>Entrar</Button>
				</Row>
				<Version>v1.0.0</Version>
			</StyledCard>
		</Container>
	);
}

export default LoginPage;
