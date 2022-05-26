import React, { useRef, useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import styled, { useTheme } from "styled-components";
import xlsxParser from "xlsx-parse-json";
import axios from "axios";
import { toast } from "react-toastify";
import { FaQuestion } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";

import UploadContainer from "../components/UploadContainer";
import DropContainer from "../components/DropContainer";
import Text from "../components/Text";
import { InputFile } from "../components/Input";
import Button from "../components/Button";
import Row from "../components/Row";
import FileType from "../components/FileType";
import Loading from "../components/Loading";
import { isLogin } from "../routes/isLoggedIn";
import Title from "./Title";
import Tutorial from "./Tutorial";
import Container from "./Container";

const DeleteButton = styled(MdDelete)`
	:hover {
		cursor: pointer;
		fill: #ad0220;
	}
`;

const Upload = ({ uploadCarteira, handleManualUpload }) => {
	const fileInputRef = useRef();
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [validFiles, setValidFiles] = useState([]);
	const [unsupportedFiles, setUnsupportedFiles] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [showModal, setShowModal] = useState(false);
	const theme = useTheme();

	const session = isLogin();
	const user = session.id;

	useEffect(() => {
		let filteredArr = selectedFiles.reduce((acc, current) => {
			const x = acc.find((item) => item.name === current.name);
			if (!x) {
				return acc.concat([current]);
			} else {
				return acc;
			}
		}, []);
		setValidFiles([...filteredArr]);
	}, [selectedFiles]);

	const preventDefault = (e) => {
		e.preventDefault();
		// e.stopPropagation();
	};

	const dragOver = (e) => {
		preventDefault(e);
	};

	const dragEnter = (e) => {
		preventDefault(e);
	};

	const dragLeave = (e) => {
		preventDefault(e);
	};

	const fileDrop = (e) => {
		preventDefault(e);
		const files = e.dataTransfer.files;
		if (files.length) {
			handleFiles(files);
		}
	};

	const filesSelected = () => {
		if (fileInputRef.current.files.length) {
			handleFiles(fileInputRef.current.files);
		}
	};

	const fileInputClicked = () => {
		fileInputRef.current.click();
	};

	const handleFiles = (files) => {
		for (let i = 0; i < files.length; i++) {
			if (validateFile(files[i])) {
				setSelectedFiles((prevArray) => [...prevArray, files[i]]);
			} else {
				files[i]["invalid"] = true;
				setSelectedFiles((prevArray) => [...prevArray, files[i]]);
				setErrorMessage("Tipo de arquivo não permitido");
				setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
			}
		}
	};

	const validateFile = (file) => {
		const validTypes = [
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"application/vnd.ms-excel",
		];
		if (validTypes.indexOf(file.type) === -1) {
			return false;
		}

		return true;
	};

	const fileSize = (size) => {
		if (size === 0) {
			return "0 Bytes";
		}
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
		const i = Math.floor(Math.log(size) / Math.log(k));
		return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	const fileType = (fileName) => {
		return (
			fileName.substring(
				fileName.lastIndexOf(".") + 1,
				fileName.length
			) || fileName
		);
	};

	const removeFile = (name) => {
		const index = validFiles.findIndex((e) => e.name === name);
		const index2 = selectedFiles.findIndex((e) => e.name === name);
		const index3 = unsupportedFiles.findIndex((e) => e.name === name);
		validFiles.splice(index, 1);
		selectedFiles.splice(index2, 1);
		setValidFiles([...validFiles]);
		setSelectedFiles([...selectedFiles]);
		if (index3 !== -1) {
			unsupportedFiles.splice(index3, 1);
			setUnsupportedFiles([...unsupportedFiles]);
		}
	};

	const uploadFiles = async () => {
		setLoading(true);

		xlsxParser.onFileSelection(validFiles[0]).then((data) => {
			let arrays = [];

			const result = Object.values(data);
			result.map((res) => {
				arrays = arrays.concat(res);
			});

			const filtered = arrays.filter((ar) => ar.Produto !== "");

			const body = filtered.map((fil) => {
				let ativo_ticker = "";
				let ativo_emp = "";
				let ativo_qtd = "";
				let ativo_vlr_unit = "";
				let ativo_vlr_total = "";

				const ativo_tipo =
					fil["Tipo"] === "Cotas"
						? "FII"
						: !fil["Tipo"]
						? "FIXA"
						: "AÇÃO";

				if (ativo_tipo === "FII") {
					ativo_ticker = fil["Código de Negociação"];
					ativo_emp = fil["Produto"];
					ativo_qtd = fil["Quantidade Disponível"];
					ativo_vlr_unit = fil["Preço de Fechamento"];
					ativo_vlr_total = fil["Valor Atualizado"];
				} else if (ativo_tipo === "FIXA") {
					ativo_ticker = fil["Indexador"];
					ativo_emp = fil["Produto"];
					ativo_qtd = fil["Quantidade Disponível"];
					ativo_vlr_unit = fil["Valor bruto"];
					ativo_vlr_total = fil["Valor Atualizado"];
				} else {
					ativo_ticker = fil["Código de Negociação"];
					ativo_emp = fil["Produto"];
					ativo_qtd = fil["Quantidade Disponível"];
					ativo_vlr_unit = fil["Preço de Fechamento"];
					ativo_vlr_total = fil["Valor Atualizado"];
				}

				return {
					usu_id: user,
					ativo_ticker,
					ativo_emp,
					ativo_tipo,
					ativo_qtd,
					ativo_vlr_unit,
					ativo_vlr_total,
				};
			});

			axios
				.post("gerarCarteira", body)
				.then(function () {
					setLoading(false);
					setSelectedFiles([]);
					setValidFiles([]);
					toast.success("Dados importados com sucesso");
					uploadCarteira(true);
				})
				.catch(function (error) {
					setLoading(false);
					console.log(error);
					toast.error("Erro ao importar dados");
					uploadCarteira(false);
				});
		});
	};

	const handleToggleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			<Tutorial
				showModal={showModal}
				handleToggleModal={handleToggleModal}
			/>
			<Container showModal={showModal}>
				<UploadContainer>
					<Row>
						<Title big>Minha Carteira</Title>
					</Row>
					<Row style={{ justifyContent: "center" }}>
						<Title medium>Upload automático</Title>
					</Row>
					<Row style={{ justifyContent: "center" }}>
						<Text style={{ margin: 0 }}>
							Como baixar o arquivo correto?
						</Text>
						<Button small onClick={handleToggleModal}>
							<FaQuestion />
						</Button>
					</Row>
					<DropContainer
						onDragOver={dragOver}
						onDragEnter={dragEnter}
						onDragLeave={dragLeave}
						onDrop={fileDrop}
						onClick={fileInputClicked}
					>
						<Loading loading={loading} absolute />
						<Text>
							<div className="upload-icon"></div>
							Arraste e solte o arquivo(.xls, .xlsx) ou clique
							para selecionar
						</Text>
						<InputFile
							ref={fileInputRef}
							type="file"
							// multiple
							onChange={filesSelected}
						/>
					</DropContainer>
					{validFiles.map((data, i) => (
						<Row key={i} style={{ width: "50%" }}>
							<Row
								style={{
									justifyContent: "flex-start",
									width: "90%",
								}}
							>
								<FileType>{fileType(data.name)}</FileType>
								<Text>{data.name}</Text>
								<Text>({fileSize(data.size)})</Text>
								{data.invalid && (
									<Text danger>({errorMessage})</Text>
								)}
							</Row>

							<DeleteButton
								size={24}
								color={theme.danger}
								onClick={() => removeFile(data.name)}
							/>
						</Row>
					))}
					<Row style={{ justifyContent: "center", width: "50%" }}>
						<Button
							onClick={() => uploadFiles()}
							disabled={
								unsupportedFiles.length > 0 ||
								!validFiles.length
							}
						>
							Upload
						</Button>
					</Row>
				</UploadContainer>
			</Container>
		</>
	);
};

export default Upload;
