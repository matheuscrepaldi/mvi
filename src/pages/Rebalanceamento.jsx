import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import styled from "styled-components";
import axios from "axios";
import { AiOutlineCheck } from "react-icons/ai";
import { ImWarning } from "react-icons/im";

import Row from "../components/Row";
import Title from "../components/Title";
import Text from "../components/Text";
import { getUser } from "../routes/isLoggedIn";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: fit-content;
	margin-top: 20px;
	align-items: center;
`;

const RowTable = styled.div`
	display: flex; /* the child elements would be grid items */
	width: 50%;
	background: #fff;
	/* :nth-child(2n + 2) {
		background: #f2f2f2;
	} */
`;

const Column = styled.div`
	display: flex;
	align-items: center;
	padding: 5px;
	flex: 1;
	border-bottom: 0.5px solid #d8d8d8;
`;

function Rebalanceamento() {
	const user = getUser();
	const [data, setData] = useState([]);

	useEffect(() => {
		async function getBalanco() {
			await axios
				.get(`buscaBlcConfig/${user}`)
				.then((res) => {
					const total = JSON.parse(sessionStorage.getItem("total"));

					const result = res?.data.map((dt) => {
						const value2 =
							(Number(total.valor.replace(",", ".")) *
								Number(dt.bal_valor)) /
							100;

						return {
							name: dt.bal_nome,
							value: Number(dt.bal_valor),
							value2: value2.toFixed(2).replace(".", ","),
						};
					});

					setData(result);
				})
				.catch(() => {
					// setLoading(false);
				});
		}

		getBalanco();
	}, []);

	const columns = [
		{ header: "Categoria", acessor: "name", type: "string" },
		{ header: "% em carteira", acessor: "value", type: "number" },
		{ header: "Valor", acessor: "value2", type: "number" },
		{ header: "", acessor: "botao", type: "number" },
	];

	// const data = [
	// 	{ name: "Ação", value: 40 },
	// 	{ name: "Fii", value: 30 },
	// 	{ name: "Renda Fixa", value: 30 },
	// ];

	const COLORS = ["#1f75c4", "#23c85d", "#d0a811"];

	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline="central"
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};

	return (
		<>
			<Row>
				<Title big>Rebalanceamento</Title>
			</Row>
			<ResponsiveContainer width="100%" height="30%">
				<PieChart width={400} height={400}>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						labelLine={false}
						label={renderCustomizedLabel}
						outerRadius={80}
						fill="#8884d8"
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
			<Container>
				<RowTable>
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
				</RowTable>
				{data.map((dt, index) => {
					let obj = {};

					return (
						<RowTable>
							{columns.map((column) => {
								if (dt["name"] === "Ação") {
									obj = JSON.parse(
										sessionStorage.getItem("Ações")
									);
								} else if (dt["name"] === "FII") {
									obj = JSON.parse(
										sessionStorage.getItem("Fiis")
									);
								} else {
									obj = JSON.parse(
										sessionStorage.getItem("Renda Fixa")
									);
								}

								let value =
									column.acessor === "name" ? (
										<Title
											medium
											style={{
												color: COLORS[index],
											}}
										>
											{dt[column.acessor]}
										</Title>
									) : column.acessor === "value" ? (
										<Column
											style={{
												border: "none",
												flexDirection: "column",
											}}
										>
											<Title style={{ margin: 5 }}>
												{obj.porcentagem}%
											</Title>
											<Text style={{ margin: 5 }}>
												Ideal:{" "}
												{Number(
													dt[column.acessor]
												).toFixed(2)}
												%
											</Text>
										</Column>
									) : column.acessor === "value2" ? (
										<Column
											style={{
												border: "none",
												flexDirection: "column",
											}}
										>
											<Title style={{ margin: 5 }}>
												R${obj.valor}
											</Title>
											<Text style={{ margin: 5 }}>
												Ideal: R${dt[column.acessor]}
											</Text>
										</Column>
									) : obj.valor === dt[column.acessor] ? (
										<AiOutlineCheck
											size={25}
											color={"#23c85d"}
										/>
									) : (
										<ImWarning
											size={25}
											color={"#dc3545"}
										/>
									);
								const align =
									column.type === "number"
										? "center"
										: "flex-start";

								return (
									<Column
										style={{
											justifyContent: align,
											color: "#808080",
										}}
									>
										{value}
									</Column>
								);
							})}
						</RowTable>
					);
				})}
			</Container>
		</>
	);
}

export default Rebalanceamento;
