import React, { useEffect, useState, useMemo } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import styled from "styled-components";
import axios from "axios";
import { AiOutlineCheck } from "react-icons/ai";
import { ImWarning } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import { BsCheck, BsX } from "react-icons/bs";
import { toast } from "react-toastify";

import Row from "../components/Row";
import Title from "../components/Title";
import Text from "../components/Text";
import { getUser } from "../routes/isLoggedIn";
import { Input } from "../components/Input";

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

const EditButton = styled(FiEdit)`
	stroke: #808080;
	margin-left: 5px;

	:hover {
		cursor: pointer;
		stroke: #1c1c1c;
	}
`;
const Check = styled(BsCheck)`
	color: #23c85d;

	:hover {
		cursor: pointer;
		color: #18873f;
	}
`;

const X = styled(BsX)`
	color: #dc3545;

	:hover {
		cursor: pointer;
		color: #a71d2a;
	}
`;

const InputText = styled(Input)`
	height: 30px;
	width: 100px;
	min-width: 100px;
	margin: 0px 5px;
`;

function Rebalanceamento() {
	const user = getUser();
	const [data, setData] = useState([]);
	const [edit, setEdit] = useState(false);
	const [values, setValues] = useState({
		Ação: 0,
		FII: 0,
		"Renda Fixa": 0,
	});

	async function getBalanco() {
		await axios
			.get(`buscaBlcConfig/${user}`)
			.then((res) => {
				const total = JSON.parse(sessionStorage.getItem("total"));
				let dataValues = {};

				const result = res?.data.map((dt) => {
					const value2 =
						(Number(total.valor.replace(",", ".")) *
							Number(dt.bal_valor)) /
						100;

					dataValues = {
						...dataValues,
						[`${dt.bal_nome}`]: dt.bal_valor,
					};

					return {
						name: dt.bal_nome,
						value: Number(dt.bal_valor),
						value2: value2.toFixed(2).replace(".", ","),
					};
				});
				setValues(dataValues);
				setData(result);
			})
			.catch(() => {
				// setLoading(false);
			});
	}
	useEffect(() => {
		getBalanco();
	}, []);

	const handleSaveBalance = async () => {
		let soma = 0;
		let body = [];

		Object.values(values).map((val) => (soma += Number(val)));

		if (soma !== 100) {
			toast.error("O valor total deve ser de 100%");
			return;
		}

		Object.entries(values).forEach(([key, value]) => {
			body.push({
				usu_id: user,
				bal_nome: key,
				bal_valor: value,
			});
		});

		await axios
			.put(`atualizaBlcConfig/${user}`, body)
			.then((res) => {
				setEdit(false);
				getBalanco();
				toast.success("Rebalanceamento feito com sucesso");
			})
			.catch(() => {
				//
			});
	};

	const columns = [
		{ header: "Categoria", acessor: "name", type: "string" },
		{ header: "% em carteira", acessor: "value", type: "number" },
		{ header: "Valor", acessor: "value2", type: "number" },
		{
			header: !edit ? (
				<EditButton onClick={() => handleEdit(true)} size={25} />
			) : (
				<>
					<Check size={25} onClick={handleSaveBalance} />
					<X onClick={() => handleEdit(false)} size={25} />
				</>
			),
			acessor: "botao",
			type: "number",
		},
	];

	const COLORS = [
		"#1f75c4",
		"#23c85d",
		"#d0a811",
		"#ff8c00",
		"#00008b",
		"#9932cc",
	];

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

	const handleEdit = (text) => {
		setEdit(text);
	};

	const handleInputChange = (e) => {
		e.preventDefault();

		const id = e.target.id;
		let value = e.target.value;

		setValues({ ...values, [`${id}`]: value });
	};

	const filteredData = useMemo(
		() => data.filter((dt) => dt.value !== 0),
		[data]
	);

	return (
		<>
			<Row>
				<Title big>Rebalanceamento</Title>
			</Row>
			<ResponsiveContainer width="100%" height="30%">
				<PieChart width={400} height={400}>
					<Pie
						data={filteredData}
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
					let rebalance = false;

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
								} else if (dt["name"] === "Renda Fixa") {
									obj = JSON.parse(
										sessionStorage.getItem("Renda Fixa")
									);
								} else if (dt["name"] === "Criptos") {
									obj = JSON.parse(
										sessionStorage.getItem("Criptos")
									);
								} else if (dt["name"] === "ETFs") {
									obj = JSON.parse(
										sessionStorage.getItem("ETFs")
									);
								} else {
									obj = JSON.parse(
										sessionStorage.getItem("Stocks")
									);
								}

								if (!obj) {
									obj = {
										porcentagem: 0,
										valor: 0,
									};
								}

								if (column.acessor === "value") {
									let valor =
										typeof obj?.porcentagem === "number"
											? obj?.porcentagem
											: obj?.porcentagem.replace(
													",",
													"."
											  );

									rebalance =
										Number(valor) === dt[column.acessor];
								}

								console.log(obj.porcentagem);

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
												{obj?.porcentagem}%
											</Title>
											<Text style={{ margin: 5 }}>
												Ideal:
												{edit ? (
													<InputText
														type="number"
														id={dt["name"]}
														defaultValue={
															dt[column.acessor]
														}
														onChange={(e) =>
															handleInputChange(e)
														}
													/>
												) : (
													Number(
														dt[column.acessor]
													).toFixed(2)
												)}
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
												R${obj?.valor}
											</Title>
											<Text style={{ margin: 5 }}>
												Ideal: R${dt[column.acessor]}
											</Text>
										</Column>
									) : rebalance ? (
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
