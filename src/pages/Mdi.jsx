import styled from "styled-components";
import { MdAttachMoney, MdMoneyOff } from "react-icons/md";

import Title from "../components/Title";
import { mdiList } from "../utils/mdi";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: fit-content;
	margin-top: 20px;
`;

const Row = styled.div`
	display: flex; /* the child elements would be grid items */

	:nth-child(2n + 2) {
		background: #f2f2f2;
	}
`;

const Column = styled.div`
	display: flex;
	align-items: center;
	padding: 5px;
	flex: 1;
	border-bottom: 0.5px solid #d8d8d8;
`;

const meses = [
	"jan",
	"fev",
	"mar",
	"abr",
	"mai",
	"jun",
	"jul",
	"ago",
	"set",
	"out",
	"nov",
	"dez",
];

function Mdi() {
	const mesAtual = new Date().getMonth();

	const columns = [
		{ header: "Ticker", acessor: "id", type: "number" },
		{ header: "Empresa", acessor: "name", type: "number" },
		{ header: "Janeiro", acessor: "jan", type: "boolean" },
		{ header: "Fevereiro", acessor: "fev", type: "boolean" },
		{ header: "Março", acessor: "mar", type: "boolean" },
		{ header: "Abril", acessor: "abr", type: "boolean" },
		{ header: "Maio", acessor: "mai", type: "boolean" },
		{ header: "Junho", acessor: "jun", type: "boolean" },
		{ header: "Julho", acessor: "jul", type: "boolean" },
		{ header: "Agosto", acessor: "ago", type: "boolean" },
		{ header: "Setembro", acessor: "set", type: "boolean" },
		{ header: "Outubro", acessor: "out", type: "boolean" },
		{ header: "Novembro", acessor: "nov", type: "boolean" },
		{ header: "Dezembro", acessor: "dez", type: "boolean" },
	];
	return (
		<>
			<Row>
				<Title big>Mapa do Dividendo Inteligente</Title>
			</Row>
			<Container>
				<Row>
					{columns.map((column) => {
						return (
							<Column
								style={{
									justifyContent: "center",
								}}
							>
								{column.header}
							</Column>
						);
					})}
				</Row>
				{mdiList.map((dt) => {
					return (
						<Row>
							{columns.map((column) => {
								let value = dt[column.acessor];

								const isMonth =
									meses[mesAtual] === column.acessor;

								if (column.type === "boolean") {
									value = value ? (
										<MdAttachMoney
											size={20}
											color={"#23c85d"}
										/>
									) : (
										<MdMoneyOff
											size={20}
											color={"#dc3545"}
										/>
									);
								}

								return (
									<Column
										style={{
											justifyContent: "center",
											color: "#808080",
											background: isMonth
												? "#d1e5f8"
												: undefined,
										}}
									>
										{value}
									</Column>
								);
							})}
						</Row>
					);
				})}
			</Container>
		</>
	);
}

export default Mdi;
