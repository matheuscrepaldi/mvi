import styled from "styled-components";

import CollapseHeader from "./CollapseHeader";
import CollapseBody from "./CollapseBody";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: fit-content;
`;

const Row = styled.div`
	display: flex; /* the child elements would be grid items */

	:nth-child(2n + 2) {
		background: #f2f2f2;
	}
`;

const Column = styled.div`
	display: flex;
	align-items: center;
	padding: 5px;
	flex: 1;
	border-bottom: 0.5px solid #d8d8d8;
`;

function Table({ columns, data, collapsed, handleCollapse, total }) {
	return (
		<Container>
			{data.map((filtered, i) => {
				if (filtered.length) {
					const title =
						i === 0 ? "Ações" : i === 1 ? "Fiis" : "Renda Fixa";

					return (
						<>
							<CollapseHeader
								title={title}
								ativos={filtered}
								total={total}
								collapsed={collapsed !== title}
								handleCollapse={() => handleCollapse(title)}
							/>
							<CollapseBody
								className={`${
									collapsed !== title && "collapsed"
								}`}
							>
								<Row>
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
								</Row>
								{filtered.map((dt) => {
									return (
										<Row>
											{columns.map((column) => {
												const align =
													column.type === "number"
														? "center"
														: "flex-start";

												return (
													<Column
														style={{
															justifyContent:
																align,
															color: "#808080",
														}}
													>
														{dt[column.acessor]}
													</Column>
												);
											})}
										</Row>
									);
								})}
							</CollapseBody>
						</>
					);
				} else {
					return;
				}
			})}
		</Container>
	);
}

export default Table;
