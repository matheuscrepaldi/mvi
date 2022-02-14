import styled, { css } from "styled-components";

const Button = styled.button`
	display: inline-block;
	line-height: 50%;
	font-family: Poppins;
	text-decoration: none;
	margin: 5px 5px 5px 5px;
	font-weight: 600;
	text-align: center;
	font-size: 14px;
	color: #fff;
	background-color: #59bfff;
	width: ${(props) => (props.small ? "40px" : "auto")};
	min-width: ${(props) => (props.small ? "40px" : "100px")};
	height: 40px;
	border: none;
	border-radius: 10px;
	padding: 5px;
	cursor: pointer;
	overflow: hidden;
	transition: all 200ms ease-in-out;
	box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
	:hover {
		box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
		background-color: #0da2ff;
	}

	:disabled {
		background: #dddddd;
		cursor: not-allowed;
		pointer-events: none;
	}

	&.selected {
		background-color: #0075bf;
	}

	@media (min-width: 1024px) {
		max-width: 400px;
	}

	@media (min-width: 768px) and (max-width: 1023px) {
		max-width: 300px;
	}

	@media (max-width: 767px) {
		max-width: 100%;
	}

	${(props) =>
		props.danger &&
		css`
			background: #dc3545;

			:hover {
				background: #a71d2a;
			}
		`}

	${(props) =>
		props.success &&
		css`
			background: #23c85d;

			:hover {
				background: #18873f;
			}
		`}


	${(props) =>
		props.cancel &&
		css`
			color: #888888;
			background: #efefef;

			:hover {
				background: #c9c9c9;
			}
		`};
`;

export default Button;
