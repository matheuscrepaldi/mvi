import React from "react";
import styled from "styled-components";

import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import DialogContainer from "./DialogContainer";

const Title = styled.span`
	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	text-align: center;
	color: #282828;
	margin: 10px;
`;

const Subtitle = styled.span`
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

export default function ReportModal(props) {
	return (
		<DialogContainer showModal={props.showModal} className="dialog">
			<Title>{props.title}</Title>
			<Subtitle>{props.subtitle}</Subtitle>

			<ButtonGroup>
				<Button type="button" onClick={props.handleToggleModal} cancel>
					Cancelar
				</Button>
				<Button
					type="button"
					onClick={props.handleConfirmModalButton}
					success
				>
					Confirmar
				</Button>
			</ButtonGroup>
		</DialogContainer>
	);
}
