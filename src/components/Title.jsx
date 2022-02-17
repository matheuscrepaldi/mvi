import styled from "styled-components";

const Title = styled.h2`
	font-size: ${(props) =>
		props.big ? "2em" : props.medium ? "1.5em" : "1em"};
	text-align: center;
	color: ${(props) => (props.textWhite ? "#fff" : "#1c1c1c")};
	margin: 10px 10px 10px 0px;

	@media (max-width: 1024px) {
		font-size: ${(props) =>
			props.big ? "2em" : props.medium ? "1em" : "0.8em"};
	}
`;

export default Title;
