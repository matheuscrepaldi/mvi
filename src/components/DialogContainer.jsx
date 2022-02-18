import styled, { css } from "styled-components";

const DialogContainer = styled.dialog`
	${(props) =>
		props.showModal &&
		css`
			display: ${(props) => (props.showModal ? "flex" : "none")};
			position: absolute;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
			max-width: 80%;
			max-height: 80%;
			background: #ffffff;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
				0 1px 2px rgba(0, 0, 0, 0.24);
			border-radius: 20px;
			border: 0;
			z-index: 2;
		`};
`;

export default DialogContainer;
