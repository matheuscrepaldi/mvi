import styled from "styled-components";

export default styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	transition: max-height 0.5s ease-in;
	height: auto;
	max-height: 800px;
	width: 100%;
	margin: 0;
	padding: 0px 5px;
	background: #fff;
	box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);

	&.collapsed {
		//padding: 0px;
		max-height: 0;
	}
`;
