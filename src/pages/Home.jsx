import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GiWallet } from "react-icons/gi";

import { getUser } from "../routes/isLoggedIn";
import Upload from "../components/Upload";
import Table from "../components/Table";
import Loading from "../components/Loading";
import Title from "../components/Title";
import Row from "../components/Row";
import Button from "../components/Button";
import Container from "../components/Container";
import Modal from "../components/Modal";

function Home() {
	const [loading, setLoading] = useState(false);
	const [carteira, setCarteira] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [collapsed, setCollapsed] = useState("");
	const [acoes, setAcoes] = useState([]);
	const [fiis, setFiis] = useState([]);
	const [fixa, setFixa] = useState([]);
	const user = getUser();

	useEffect(() => {
		setLoading(true);

		axios
			.get(`buscaCarteira/${user}`)
			.then((res) => {
				setLoading(false);
				setCarteira(res?.data);
			})
			.catch(() => {
				setLoading(false);
				toast.error("Erro ao carregar dados");
			});
	}, [user]);

	useEffect(() => {
		const filteredAcoes = carteira.filter(
			(cart) => cart.ativo_tipo === "AÇÃO"
		);
		const filteredFiis = carteira.filter(
			(cart) => cart.ativo_tipo === "FII"
		);
		const filteredFixa = carteira.filter(
			(cart) => cart.ativo_tipo === "FIXA"
		);

		setAcoes(filteredAcoes);
		setFiis(filteredFiis);
		setFixa(filteredFixa);

		// carteira.map((dt) => {
		// 	if (dt.ativo_tipo === "AÇÃO") {
		// 		setAcoes([...acoes, dt]);
		// 	} else if (dt.ativo_tipo === "FII") {
		// 		setFiis([...fiis, dt]);
		// 	} else {
		// 		setFixa([...fixa, dt]);
		// 	}

		// 	return dt;
		// });
	}, [carteira]);

	const uploadCarteira = async (uploaded) => {
		if (uploaded) {
			setLoading(true);

			await axios
				.get(`buscaCarteira/${user}`)
				.then((res) => {
					setLoading(false);
					setCarteira(res?.data);
				})
				.catch(() => {
					setLoading(false);
					toast.error("Erro ao carregar dados");
				});
		}
	};

	const deletarCarteira = async () => {
		setLoading(true);

		await axios
			.delete(`deletarAtivos/${user}`)
			.then((res) => {
				setLoading(false);
				setCarteira([]);
				toast.success("Carteira excluída com sucesso");
			})
			.catch(() => {
				setLoading(false);
				toast.error("Erro ao excluir carteira");
			});
	};

	const handleToggleModal = () => {
		setShowModal(!showModal);
	};

	const handleConfirmModalButton = () => {
		setShowModal(false);
		deletarCarteira();
	};

	const handleCollapse = (type) => {
		const found = collapsed === type;

		if (found) {
			setCollapsed("");
		} else {
			setCollapsed(type);
		}
	};

	const columns = [
		{ header: "Ticker", acessor: "ativo_ticker", type: "string" },
		// { header: "Empresa", acessor: "ativo_emp", type: "string" },
		{ header: "Quantidade", acessor: "ativo_qtd", type: "number" },
		{ header: "Valor Unitário", acessor: "ativo_vlr_unit", type: "number" },
		{ header: "Valor Total", acessor: "ativo_vlr_total", type: "number" },
	];

	return (
		<>
			<Modal
				showModal={showModal}
				title="Tem certeza que deseja excluir a sua carteira?"
				subtitle="Caso continue, essas informações serão perdidas!"
				handleToggleModal={handleToggleModal}
				handleConfirmModalButton={handleConfirmModalButton}
			/>
			<Container showModal={showModal}>
				<Loading loading={loading} absolute />
				<Row>
					<Title big>Minha Carteira</Title>
					{carteira.length > 0 && (
						<Button danger small onClick={handleToggleModal}>
							<GiWallet />
						</Button>
					)}
				</Row>
				{!loading &&
					(carteira.length ? (
						<Table
							columns={columns}
							data={[acoes, fiis, fixa]}
							collapsed={collapsed}
							handleCollapse={handleCollapse}
						/>
					) : (
						<Upload uploadCarteira={uploadCarteira} />
					))}
			</Container>
		</>
	);
}

export default Home;
