import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { getUser } from "../routes/isLoggedIn";
import Upload from "../components/Upload";
import Table from "../components/Table";

function Home() {
	const [loading, setLoading] = useState(false);
	const [carteira, setCarteira] = useState([]);
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
	}, []);

	const columns = [
		{ header: "Ticker", acessor: "ativo_ticker" },
		{ header: "Empresa", acessor: "ativo_emp" },
		{ header: "Tipo", acessor: "ativo_tipo" },
		{ header: "Quantidade", acessor: "ativo_qtd" },
		{ header: "Valor Unitário", acessor: "ativo_vlr_unit" },
		{ header: "Valor Total", acessor: "ativo_vlr_total" },
	];

	return carteira.length ? (
		<Table columns={columns} data={carteira} />
	) : (
		<Upload />
	);
}

export default Home;
