import styled from 'styled-components';

export const LoginWrapper = styled.div`
  height: 100%;
  display: flex;
`;

export const LoginLogo = styled.div`
  width: 50%;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    display: none;
  }
`;

export const Explain = styled.div`
  text-align: center;
  letter-spacing: 2px;
  font-weight: 500;
`;
export const LoginPart = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: black;
  @media (max-width: 800px) {
    width: 100%;
    background-color: ${({ theme }) => (theme.themeColor === 'dark' ? theme.darkColor : 'transparent')};
    color: ${({ theme }) => (theme.themeColor === 'dark' ? 'white' : 'black')};
  }
  background-color: ${({ theme }) => (theme.themeColor === 'dark' ? theme.lightColor : 'transparent')};
`;

export const Logindiv = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: auto;
`;
export const Input = styled.input`
  border: 1.5px solid #28b381;
  width: 100%;
  outline: none;
  font-size: 18px;
  border-radius: 5px;
  padding: 10px 20px;
  &[type='submit'] {
    cursor: pointer;
    border: none;
    background-color: #28b381;
    height: 45px;
    color: white;
    font-weight: 600;
    &:hover {
      opacity: 0.8;
    }
  }
`;
export const Switcher = styled.span`
  font-size: 16px;
  a {
    color: #a9b5bc;
  }
`;
