import styled from "styled-components";

const UploadContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
	width: 50%;
	height: 200px;
	border: 4px dashed ${({ theme }) => theme.primary};
`;

export default UploadContainer;
