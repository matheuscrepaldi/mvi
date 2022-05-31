import { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import { BsPlus, BsCheck, BsX, BsPencil, BsTrash } from "react-icons/bs";

import Title from "../components/Title";
import { getUser } from "../routes/isLoggedIn";
import Text from "../components/Text";
import Button from "../components/Button";
import { Input, Select } from "../components/Input";
import useDynamicForm from "../hooks/useDynamicForm";
import Autocomplete from "../components/Autocomplete";

const Row = styled.div`
	display: flex; /* the child elements would be grid items */
	:nth-child(2n + 2) {
		background: #f2f2f2;
	}
`;

const Column = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5px;
	flex: 1;
	border-bottom: 0.5px solid #d8d8d8;
`;

const Table = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	align-items: center;
	border-radius: 10px;
	box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);
`;

const InputText = styled(Input)`
	height: 30px;
	width: 100px;
	min-width: 100px;
`;

const SelectInput = styled(Select)`
	height: 30px;
	width: 100px;
	min-width: 100px;
`;

function Transacoes() {
	const [loading, setLoading] = useState(false);
	const [alertas, setAlertas] = useState([]);
	const [novosAlertas, setNovosAlertas] = useState([]);
	const [editarAlerta, setEditarAlerta] = useState("");
	const { fields, setFields, handleInputChange } = useDynamicForm();
	const [empresas, setEmpresas] = useState([]);

	const user = getUser();

	async function getAlertas() {
		await axios
			.get(`buscaCarteira/${user}`)
			.then((res) => {
				setLoading(false);
				setAlertas(res?.data);
			})
			.catch(() => {
				setLoading(false);
				toast.error("Erro ao carregar dados");
			});
	}

	useEffect(() => {
		getAlertas();
	}, []);

	const addNewLine = () => {
		setNovosAlertas([
			...novosAlertas,
			{
				id: Math.random().toString(36).substr(2, 9),
				ativo_ticker: "",
				ativo_tipo: "",
				ativo_vlr_unit: "",
			},
		]);
	};

	const removeLine = (id) => {
		const filtered = novosAlertas.filter((novo) => novo.id !== id);
		setNovosAlertas(filtered);
	};

	function handleTableInputChange(e, key, id) {
		const result = novosAlertas.find((novo) => novo.id === key);
		result[`${id}`] = e.target.value;

		setNovosAlertas([result]);
	}

	const addNewAlerta = async (id) => {
		const found = novosAlertas.find((novo) => novo.id === id);
		const filterNovos = novosAlertas.filter((novo) => novo.id !== id);

		const body = {
			usu_id: user,
			ativo_ticker: found.ativo_ticker,
			ativo_emp: "Transação",
			ativo_tipo: found.ativo_tipo,
			ativo_qtd: found.ativo_qtd,
			ativo_vlr_unit: found.ativo_vlr_unit,
			ativo_vlr_total: found.ativo_vlr_total,
		};

		if (found) {
			setLoading(true);
			await axios
				.post("gerarCarteira", [body])
				.then((res) => {
					setLoading(false);
					toast.success("Transação criada com sucesso");
					setNovosAlertas(filterNovos);
					getAlertas();
				})
				.catch(() => {
					setLoading(false);
					toast.error("Erro ao carregar dados");
				});
		}
	};

	const editAlerta = (id) => {
		const alerta = alertas.find((al) => al.ativo_id === id);
		setEditarAlerta(id);
		setFields(alerta);
	};

	const updateAlerta = async (id) => {
		setLoading(true);
		await axios
			.put(`atualizarAlerta/${id}?usu_id=${user}`, {
				...fields,
				usu_id: user,
			})
			.then((res) => {
				setLoading(false);
				toast.success("Alerta alterado com sucesso");
				setEditarAlerta("");
				getAlertas();
			})
			.catch(() => {
				setLoading(false);
				toast.error("Erro ao carregar dados");
			});
	};

	const removeAlerta = async (id) => {
		setLoading(true);
		await axios
			.delete(`deletarAlerta/${id}?usu_id=${user}`)
			.then((res) => {
				setLoading(false);
				toast.success("Alerta excluído com sucesso");
				getAlertas();
			})
			.catch(() => {
				setLoading(false);
				toast.error("Erro ao carregar dados");
			});
	};

	const cancelEdit = () => {
		setEditarAlerta("");
		setFields({});
	};

	const handleSelectValue = (value) => {
		setFields({ ...fields, ativo_ticker: value });
	};

	const handleSelectNewValue = (value, id) => {
		const result = novosAlertas.find((novo) => novo.id === id);
		result[`ativo_ticker`] = value;
	};

	const columns = [
		{ header: "ID", acessor: "ativo_id", type: "number" },
		{ header: "Tipo", acessor: "ativo_tipo", type: "number" },
		{ header: "Ativo", acessor: "ativo_ticker", type: "number" },
		{ header: "Qtde", acessor: "ativo_qtd", type: "number" },
		{ header: "Valor", acessor: "ativo_vlr_unit", type: "number" },
		{ header: "Valor total", acessor: "ativo_vlr_total", type: "number" },
	];

	return (
		<>
			<Row>
				<Title big>Transações</Title>
			</Row>
			<Row style={{ background: "#E5E5E5", justifyContent: "center" }}>
				<Table>
					<Row style={{ width: "100%", background: "#fff" }}>
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
						<Column
							style={{
								justifyContent: "center",
							}}
						>
							<Button
								small
								onClick={addNewLine}
								disabled={novosAlertas.length}
							>
								<BsPlus size={25} />
							</Button>
						</Column>
					</Row>
					{alertas.length === 0 && novosAlertas.length === 0 && (
						<Row
							style={{
								width: "100%",
								background: "#fff",
								justifyContent: "center",
							}}
						>
							<Text>Sem dados</Text>
						</Row>
					)}
					{novosAlertas.length > 0 &&
						novosAlertas.map((novo) => {
							return (
								<Row
									style={{
										width: "100%",
										background: "#fff",
									}}
								>
									<Column>
										<Text>Novo</Text>
									</Column>
									<Column>
										<SelectInput
											id={`vlr_${novo.id}`}
											defaultValue={novo.ativo_tipo}
											onChange={(e) =>
												handleTableInputChange(
													e,
													novo.id,
													`ativo_tipo`
												)
											}
										>
											<option value="">Selecione</option>
											<option value="CRIPTO">
												Cripto
											</option>
											<option value="ETF">ETFs</option>
											<option value="STOCK">
												Stocks
											</option>
										</SelectInput>
									</Column>
									<Column>
										<Autocomplete
											type={novosAlertas[0]?.ativo_tipo}
											handleSelectValue={(value) =>
												handleSelectNewValue(
													value,
													novo.id
												)
											}
											inputValue={novo.ativo_ticker}
										/>
									</Column>
									<Column>
										<InputText
											type="number"
											id={`vlr_${novo.id}`}
											defaultValue={novo.ativo_qtd}
											onChange={(e) =>
												handleTableInputChange(
													e,
													novo.id,
													`ativo_qtd`
												)
											}
										/>
									</Column>
									<Column>
										<InputText
											type="number"
											id={`vlr_${novo.id}`}
											defaultValue={novo.ativo_vlr_unit}
											onChange={(e) =>
												handleTableInputChange(
													e,
													novo.id,
													`ativo_vlr_unit`
												)
											}
										/>
									</Column>
									<Column>
										<InputText
											type="number"
											id={`vlr_${novo.id}`}
											defaultValue={novo.ativo_vlr_total}
											onChange={(e) =>
												handleTableInputChange(
													e,
													novo.id,
													`ativo_vlr_total`
												)
											}
										/>
									</Column>
									<Column>
										<Button
											small
											success
											onClick={() =>
												addNewAlerta(novo.id)
											}
										>
											<BsCheck size={25} />
										</Button>
										<Button
											small
											danger
											onClick={() => removeLine(novo.id)}
										>
											<BsX size={25} />
										</Button>
									</Column>
								</Row>
							);
						})}
					{alertas.map((alerta) => {
						const isEdit = alerta.ativo_id === editarAlerta;

						return (
							<Row
								style={{
									width: "100%",
									background: "#fff",
								}}
							>
								{columns.map((column) => {
									const align =
										column.type === "number"
											? "center"
											: "flex-start";

									const value =
										column.acessor === "ativo_vlr_unit" ||
										column.acessor === "ativo_vlr_total"
											? Number(alerta[column.acessor])
													.toFixed(2)
													.replace(".", ",")
											: alerta[column.acessor];

									const conditions = ["id", "tipo", "ticker"];
									const disabled = conditions.some((el) =>
										column.acessor.includes(el)
									);

									return (
										<Column
											style={{
												justifyContent: align,
												color: "#808080",
											}}
										>
											{isEdit ? (
												column.acessor.includes(
													"ticker"
												) ? (
													<Autocomplete
														handleSelectValue={
															handleSelectValue
														}
														inputValue={
															alerta[
																column.acessor
															]
														}
														disabled={disabled}
													/>
												) : (
													<InputText
														type={
															column.acessor.includes(
																"vlr"
															)
																? "number"
																: undefined
														}
														disabled={disabled}
														id={column.acessor}
														defaultValue={
															alerta[
																column.acessor
															]
														}
														onChange={
															handleInputChange
														}
													/>
												)
											) : (
												value
											)}
										</Column>
									);
								})}
								<Column>
									<Button
										small
										success
										onClick={() =>
											isEdit
												? updateAlerta(alerta.ativo_id)
												: editAlerta(alerta.ativo_id)
										}
									>
										{isEdit ? (
											<BsCheck size={25} />
										) : (
											<BsPencil size={20} />
										)}
									</Button>
									<Button
										small
										danger
										onClick={() =>
											isEdit
												? cancelEdit()
												: removeAlerta(alerta.ativo_id)
										}
									>
										{isEdit ? (
											<BsX size={25} />
										) : (
											<BsTrash size={20} />
										)}
									</Button>
								</Column>
							</Row>
						);
					})}
				</Table>
			</Row>
		</>
	);
}

export default Transacoes;
