import "./App.css";
import xlsxParser from "xlsx-parse-json";

function App() {
	const readUploadFile = (e) => {
		e.preventDefault();
		if (e.target.files) {
			xlsxParser.onFileSelection(e.target.files[0]).then((data) => {
				let arrays = [];

				const result = Object.values(data);
				result.map((res) => {
					arrays = arrays.concat(res);
				});

				const filtered = arrays.filter((ar) => ar.Produto !== "");
				console.log(filtered);
			});
		}
	};

	return (
		<div className="App">
			<form>
				<label htmlFor="upload">Upload File</label>
				<input
					type="file"
					name="upload"
					id="upload"
					onChange={readUploadFile}
				/>
			</form>
		</div>
	);
}

export default App;
