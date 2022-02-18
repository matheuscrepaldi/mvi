import styled from "styled-components";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

import Row from "./Row";
import Title from "./Title";
import Button from "./Button";

const LeftPanel = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 50%;
`;
const RightPanel = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 50%;
`;

const SmallButton = styled(Button)`
	height: 25px;
`;

const CollapseRow = styled(Row)`
	border-bottom: 1px solid #d8d8d8;
	background: #fff;
	align-items: flex-end;
	margin: 0;
	padding: 5px;
	box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);
`;

function CollapseHeader({ title, collapsed, handleCollapse }) {
	return (
		<CollapseRow>
			<LeftPanel>
				<Title medium> {title}</Title>
			</LeftPanel>
			<RightPanel>
				<SmallButton type="button" small onClick={handleCollapse}>
					{collapsed ? (
						<FaChevronCircleDown />
					) : (
						<FaChevronCircleUp />
					)}
				</SmallButton>
			</RightPanel>
		</CollapseRow>
	);
}

export default CollapseHeader;
