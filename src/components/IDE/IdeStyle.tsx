import { styled } from 'styled-components';

export const Title = styled.div`
  border-bottom: 0.3px solid #a3a3a3;
  padding: 7px 10px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  font-size: 18px;
`;
export const ProjectWrapper = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
`;
export const FolderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 0.5px solid;
  width: 500px;
  height: 400px;
  padding: 30px;
  background-color: ${props => props.theme.backgroundColor};
  position: fixed;
`;
export const CreateCustomButton = styled.div`
  border: 1px solid #28b381;
  font-size: 16px;
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
`;

export const EditorButton = styled.button<{ active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.5px solid;
  border-top-right-radius: 18px;
  background-color: ${({ active }) => (active ? '#28b381' : '#ffffff')};
  color: black;
  font-size: 16px;
  font-weight: 600;
  padding: 10px;
  width: 140px;
  height: 40px;
`;
export const ConsoleButton = styled.div`
  width: max-content;
  height: auto;
  background-color: #28b381;
  color: black;
  font-weight: 600;
  padding: 8px;
  font-size: 16px;
  border: 0.5px solid black;
  border-radius: 5px;
`;

export const ConsoleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #41c464;
  background-color: '#243B56';
`;
export const ButtonWrapper = styled.div`
  background-color: ${props => props.theme.ButtonWrapperBackground};
`;
export const TreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => (theme.themeColor === 'light' ? '#f4f4f4' : '#18293D')};
`;
export const FileTreeWrapper = styled.div`
  font-size: 16px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 3px;
`;
export const FileWrapper = styled.div`
  border: none;
  // :hover {
  //   background-color: rgba(118, 193, 175, 0.3);
  //   border-radius: 4px;
  // }
`;
export const FontColor = styled.h1`
  color: ${({ theme }) => (theme.themeColor === 'dark' ? '#FFFFFF' : '#000000')};
`;
export const PopItem = styled.div`
  border: none;
  display: flex;
  flex-direction: row;
  gap: 3px;
  align-items: center;
  font-size: 14px;
  padding: 3px 5px;
  color: ${({ theme }) => (theme.themeColor === 'light' ? '#000000' : '#ffffff')};
  background-color: ${({ theme }) => (theme.themeColor === 'light' ? '#FFFFFF' : '#1C2631')};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => (theme.themeColor === 'light' ? '#54595B' : '#76ECC2')};
    background-color: ${({ theme }) => (theme.themeColor === 'light' ? '#F5F5F5' : '#243B56')};
  }

  &:hover svg {
    color: ${({ theme }) => (theme.themeColor === 'light' ? '#54595B' : '#76ECC2')};
  }

  &:hover span {
    color: ${({ theme }) => (theme.themeColor === 'light' ? '#54595B' : '#76ECC2')};
  }
`;

export const MenuText = styled.span`
  font-size: 14px;
`;
export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => (theme.themeColor === 'light' ? '#ffffffb7' : '#1C2631b3')};
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
  font-size: 18px;
`;
