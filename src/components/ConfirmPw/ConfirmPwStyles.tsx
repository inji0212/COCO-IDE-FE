import styled from 'styled-components';

export const ConfirmWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 100%;
  span {
    width: 100%;
  }
  input {
    font-size: 16px;
    width: 90%;
    height: 100%;
    border-radius: 5px;
    outline: none;
    padding: 10px 20px;
    color: black;
  }
`;
export const ConfirmDiv = styled.div`
  display: flex;
  background-color: white;
  align-items: center;
  width: 100%;
  @media (max-width: 1000px) {
    min-width: 50%;
  }
  height: 10%;
  border: 1px solid #28b381;
  border-radius: 5px;
`;

export const SaveBtn = styled.button`
  width: 30%;
  height: 100%;
  border-radius: 5px;
  background-color: #28b381;
  font-size: 16px;
`;

export const CancleBtn = styled.button`
  width: 30%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #28b381;
  font-size: 16px;
  color: #28b381;
`;
export const Eyes = styled.div`
  position: absolute;
  &:hover {
    cursor: pointer;
  }
  right: 8px;
`;
