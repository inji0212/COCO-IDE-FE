import styled from 'styled-components';

export const EmailDiv = styled.div`
  top: 50%;
  left: 50%;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
`;
export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: ${({ theme }) => (theme.themeColor === 'dark' ? theme.darkColor : 'transparent')};
  border-radius: 5px;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: '50%';

  @media (max-width: 900px) {
    min-width: 60%;
  }
`;
