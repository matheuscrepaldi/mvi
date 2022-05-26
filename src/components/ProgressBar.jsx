import styled from "styled-components";

const Bar = styled.div`
	display: flex;
	height: 5px;
	width: 100%;
	max-width: 250px;
	background-color: #e0e0de;
	border-radius: 50px;
	margin: 5px;
`;

const Progress = styled.div`
	border-radius: 50px;
	height: 100%;
	width: ${(props) => props.width + "%"};
	background-color: ${(props) => (props.width > 0 ? props.color : "#e0e0de")};
	margin-left: ${(props) => props.padLeft + "px"};
`;

function ProgressBar({ title, width, color }) {
	const acaoWidth = document?.getElementById(`acao_Ações`)?.offsetWidth;
	const fiiWidth = document?.getElementById(`fii_Fiis`)?.offsetWidth;
	const fixaWidth = document?.getElementById(`fixa_Renda Fixa`)?.offsetWidth;
	const criptoWidth = document?.getElementById(`cripto_Criptos`)?.offsetWidth;
	const etfWidth = document?.getElementById(`etf_ETFs`)?.offsetWidth;

	return (
		<Bar>
			<Progress
				id={`acao_${title}`}
				width={title === "Ações" ? width : undefined}
				color={color}
			/>
			<Progress
				id={`fii_${title}`}
				width={title === "Fiis" ? width : undefined}
				color={color}
				padLeft={title === "Fiis" && acaoWidth}
			/>
			<Progress
				id={`fixa_${title}`}
				width={title === "Renda Fixa" ? width : undefined}
				color={color}
				padLeft={title === "Renda Fixa" && acaoWidth + fiiWidth}
			/>
			<Progress
				id={`cripto_${title}`}
				width={title === "Criptos" ? width : undefined}
				color={color}
				padLeft={
					title === "Criptos" && acaoWidth + fiiWidth + fixaWidth
				}
			/>
			<Progress
				id={`etf_${title}`}
				width={title === "ETFs" ? width : undefined}
				color={color}
				padLeft={
					title === "ETFs" &&
					acaoWidth + fiiWidth + fixaWidth + criptoWidth
				}
			/>
			<Progress
				id={`stock_${title}`}
				width={title === "Stocks" ? width : undefined}
				color={color}
				padLeft={
					title === "Stocks" &&
					acaoWidth + fiiWidth + fixaWidth + criptoWidth + etfWidth
				}
			/>
		</Bar>
	);
}

export default ProgressBar;
