import styled from 'styled-components';

export const SignUpWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const SignUpPart = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 70%;
  align-items: center;
  width: 75%;
  span {
    width: 75%;
  }
`;
export const InputDiv = styled.div`
  display: flex;
  border: 1.5px solid #28b381;
  align-items: center;
  width: 75%;
  border-radius: 5px;
  height: 9%;
  position: relative;
  background-color: white;
  justify-content: center;
`;

export const Check = styled.button`
  height: 80%;
  width: 13%;
  background-color: ${props => (props.disabled ? 'lightgray' : '#76ecc2')}; // disabled 상태에 따라 색상 변경
  position: absolute;
  &:hover {
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')}; // 커서 스타일도 조건부로
  }
  right: 3px;
  color: black;
  border-radius: 15px;
  white-space: nowrap;
`;
export const Eyes = styled.div`
  position: absolute;
  &:hover {
    cursor: pointer;
  }
  right: 15px;
`;

export const Svg = styled.div`
  position: absolute;
  left: 15px;
`;
export const SignUpInput = styled.input`
  /* border: 1.5px solid #28b381; */
  margin-right: 15px;
  font-size: 18px;
  outline: none;
  width: 75%;
  height: 90%;
  color: black;
  padding: 10px 10px;
  &[type='submit'] {
    border: none;
    background-color: #28b381;
    height: 9%;
    width: 75%;
    border-radius: 5px;
    margin-right: 0px;
    color: white;
    font-weight: 600;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;
export const Error = styled.span`
  color: red;
  font-size: 14px;
  width: auto;
`;
