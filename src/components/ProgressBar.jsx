import styled from "styled-components";

const Bar = styled.div`
	display: flex;
	height: 5px;
	width: 100%;
	max-width: 200px;
	background-color: #e0e0de;
	border-radius: 50px;
	margin: 5px;
`;

const Progress = styled.div`
	border-radius: 50px;
	height: 100%;
	width: ${(props) => props.width + "%"};
	background-color: ${(props) => (props.width > 0 ? props.color : "#e0e0de")};
	border-radius: "inherit";
`;

function ProgressBar({ title, width, color }) {
	return (
		<Bar>
			<Progress width={title === "Ações" && width} color={color} />
			<Progress width={title === "Fiis" && width} color={color} />
			<Progress width={title === "Renda Fixa" && width} color={color} />
		</Bar>
	);
}

export default ProgressBar;
