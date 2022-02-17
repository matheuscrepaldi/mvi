import styled, { css } from "styled-components";

const Text = styled.span`
	font-size: 1em;
	text-align: center;
	color: #808080;
	margin: 10px 10px 10px 0px;

	${(props) =>
		props.danger &&
		css`
			color: ${({ theme }) => theme.danger};
		`}
`;

export default Text;
