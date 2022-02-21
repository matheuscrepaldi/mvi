import React from "react";
import axios from "axios";
import styled from "styled-components";

import { Input } from "./Input";
import Text from "./Text";

const Result = styled.div`
	display: flex;
	flex-direction: column;
	width: 110px;
	border: 1px solid #59bfff;
	position: absolute;
	background: #fff;
	border-radius: 4px;
	overflow-y: auto;
	max-height: 350px;
`;

const InputText = styled(Input)`
	height: 30px;
	min-width: 100px;
	width: 100px;
`;

const Label = styled(Text)`
	margin: 0;
	padding: 5px;

	:hover {
		cursor: pointer;
		background: #ccc;
	}
`;

export default function Autocomplete({ inputValue, handleSelectValue }) {
	const [searchText, setSearchText] = React.useState(inputValue);
	const [results, setResults] = React.useState([]);
	const lastRequest = React.useRef(null);

	// this effect will be fired every time searchText changes
	React.useEffect(() => {
		// setting min lenght for searchText
		if (searchText.length >= 2 && lastRequest.current) {
			// updating the ref variable with the current searchText
			lastRequest.current = searchText;
			axios
				.get(`consultar?search=${searchText}`)
				.then((res) => {
					if (lastRequest.current === searchText) {
						setResults(res?.data?.stocks);
					}
				})
				.catch((e) => console.log(e));
		}
	}, [searchText]);

	const onChangeInput = (e) => {
		setSearchText(e.target.value);
		lastRequest.current = e.target.value;
	};

	const selectValue = (value) => {
		setSearchText(value);
		lastRequest.current = null;
		handleSelectValue(value);
	};

	return (
		<div className="App">
			<InputText onChange={(e) => onChangeInput(e)} value={searchText} />

			{searchText?.length >= 2 && lastRequest.current === searchText && (
				<Result>
					{results.map((res) => {
						return (
							<Label onClick={() => selectValue(res)}>
								{res}
							</Label>
						);
					})}
				</Result>
			)}
		</div>
	);
}
