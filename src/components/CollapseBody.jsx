import styled from "styled-components";

export default styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	transition: max-height 0.2s ease-in-out;
	height: auto;
	width: 100%;
	margin: 0;
	padding: 5px;
	background: #fff;
	box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);

	&.collapsed {
		max-height: 0;
	}
`;
