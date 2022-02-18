import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid black;
	width: 100%;
	height: fit-content;
`;

const Row = styled.div`
	display: flex; /* the child elements would be grid items */
`;

const Column = styled.div`
	display: flex;

	padding: 5px;
	flex: 1;
`;

function Table(props) {
	return (
		<Container>
			<Row>
				{props.columns.map((column) => {
					return <Column>{column.header}</Column>;
				})}
			</Row>
			{props.data.map((dt) => {
				return (
					<Row>
						{props.columns.map((column) => {
							return <Column>{dt[column.acessor]}</Column>;
						})}
					</Row>
				);
			})}
		</Container>
	);
}

export default Table;
