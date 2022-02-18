import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid black;
`;

const Row = styled.div`
	display: flex; /* the child elements would be grid items */
	border: 1px solid black;
`;

const Column = styled.div`
	display: flex;
	border: 1px solid black;
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
