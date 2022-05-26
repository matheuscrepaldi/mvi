import styled, { useTheme } from "styled-components";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

import Row from "./Row";
import Title from "./Title";
import Button from "./Button";
import Text from "./Text";
import ProgressBar from "./ProgressBar";
import Column from "./Column";

const LeftPanel = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 50%;
`;
const RightPanel = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 50%;
`;

const SmallButton = styled(Button)`
	height: 25px;
`;

const CollapseRow = styled(Row)`
	border-bottom: 1px solid #d8d8d8;
	background: #fff;
	align-items: flex-end;
	margin: 0;
	padding: 5px;
	box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);
`;

function CollapseHeader({
	title,
	collapsed,
	handleCollapse,
	ativos,
	total,
	showValue,
}) {
	const theme = useTheme();

	const color =
		title === "Ações"
			? theme.primary
			: title === "Fiis"
			? "#23c85d"
			: title === "Renda Fixa"
			? "#d0a811"
			: title === "Criptos"
			? "#ff8c00"
			: title === "ETFs"
			? "#00008b"
			: "#9932cc";

	let valorTotal = 0;
	ativos.map((ativo) => {
		valorTotal += Number(ativo.ativo_vlr_total);

		return ativo;
	});

	const width = (valorTotal * 100) / total;

	sessionStorage.setItem(
		title,
		JSON.stringify({
			porcentagem: width.toFixed(2).replace(".", ","),
			valor: valorTotal.toFixed(2).replace(".", ","),
		})
	);

	return (
		<CollapseRow>
			<LeftPanel>
				<Title medium style={{ color }}>
					{title}
				</Title>
			</LeftPanel>
			<RightPanel>
				<Text textBlack>{ativos.length} ativos</Text>
				<Column>
					<Row style={{ margin: 0 }}>
						<Title style={{ color }}>
							{showValue
								? width.toFixed(2).replace(".", ",")
								: "****"}
							%
						</Title>
						<Text>
							R$
							{showValue
								? valorTotal.toFixed(2).replace(".", ",")
								: "****"}
						</Text>
					</Row>
					<ProgressBar title={title} width={width} color={color} />
				</Column>
				<SmallButton
					type="button"
					style={{ background: color }}
					small
					onClick={handleCollapse}
				>
					{collapsed ? (
						<FaChevronCircleDown />
					) : (
						<FaChevronCircleUp />
					)}
				</SmallButton>
			</RightPanel>
		</CollapseRow>
	);
}

export default CollapseHeader;
