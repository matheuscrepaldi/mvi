import React from "react";
import styled from "styled-components";

import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import DialogContainer from "./DialogContainer";
import Text from "./Text";

const Title = styled.span`
	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: 1.2em;
	line-height: 24px;
	text-align: center;
	color: #282828;
	margin: 0px 10px;
	width: 300px;

	display: flex;
	flex-direction: row;
	align-content: center;
	justify-content: flex-start;
	align-items: center;
`;

const Subtitle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	font-family: Poppins;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 18px;
	text-align: center;
	color: #888888;
	margin-bottom: 20px;
`;

export default function Tutorial(props) {
	return (
		<DialogContainer showModal={props.showModal} className="dialog">
			<Title style={{ marginBottom: 20, marginTop: 10 }}>
				Tutorial para importar dados
			</Title>
			<Subtitle>
				<Title medium>
					1.
					<Text style={{ marginLeft: 5 }}>
						Acesse o site da{" "}
						<a
							href="https://www.investidor.b3.com.br"
							target="_blank"
						>
							B3: A Bolsa do Brasil
						</a>
					</Text>
				</Title>
				<Title medium>
					2.<Text style={{ marginLeft: 5 }}>Faça o login</Text>
				</Title>
				<Title medium>
					3.
					<Text style={{ marginLeft: 5 }}>Acesse o menu Extrato</Text>
				</Title>
				<Title medium>
					4.
					<Text style={{ marginLeft: 5 }}>Acesse a aba Posição</Text>
				</Title>
				<Title medium>
					5.{" "}
					<Text style={{ marginLeft: 5 }}>
						Baixar extrato (excel)
					</Text>
				</Title>
			</Subtitle>

			<ButtonGroup>
				<Button type="button" onClick={props.handleToggleModal} cancel>
					Fechar
				</Button>
			</ButtonGroup>
		</DialogContainer>
	);
}
