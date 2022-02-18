import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";

import { getUser } from "../routes/isLoggedIn";
import Upload from "../components/Upload";
import Table from "../components/Table";
import Loading from "../components/Loading";

const Container = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	position: relative;
`;

function Home() {
	const [loading, setLoading] = useState(false);
	const [carteira, setCarteira] = useState([]);
	const user = getUser();

	useEffect(async () => {
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
	}, []);

	const uploadCarteira = async (uploaded) => {
		if (uploaded) {
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

	const columns = [
		{ header: "Ticker", acessor: "ativo_ticker" },
		{ header: "Empresa", acessor: "ativo_emp" },
		{ header: "Tipo", acessor: "ativo_tipo" },
		{ header: "Quantidade", acessor: "ativo_qtd" },
		{ header: "Valor Unitário", acessor: "ativo_vlr_unit" },
		{ header: "Valor Total", acessor: "ativo_vlr_total" },
	];

	return (
		<Container>
			<Loading loading={loading} absolute />
			{carteira.length ? (
				<Table columns={columns} data={carteira} />
			) : (
				<Upload uploadCarteira={uploadCarteira} />
			)}
		</Container>
	);
}

export default Home;
