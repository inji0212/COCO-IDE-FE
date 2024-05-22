import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import folderLight from '../assets/folderlight.svg';
import messageTrash from '../assets/messageTrash.svg';
import { ThemeProvider } from 'styled-components';
import { useTheTheme } from '../components/Theme';
import ReactDOM from 'react-dom';
import { Container, Overlay } from './ModalOverlay';
import { Project } from '../state/IDE/ProjectState';
import useProjectStore from '../state/IDE/ProjectState';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../state/AuthStore';

interface PjListProps {
  onClose: () => void;
}
const lightTheme = {
  text: '#000000', // 라이트 모드 폰트 색상
  filter: 'none',
};

const darkTheme = {
  text: '#fff', // 다크 모드 폰트 색상
  filter: 'invert(100%)', // 다크 모드에서는 색상 반전
};

const Myproject = styled.h1`
  width: 90%;
  display: flexed;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  padding: 10px;
  color: ${({ theme }) => theme.text};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
`;
const CloseModal = styled.h1`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  margin: 5px 20px 10px 0px;
  color: ${({ theme }) => theme.text};
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
`;
const Listcontainer = styled.div`
  height: 300px;
  width: 90%;
  overflow-y: scroll;
  cursor: pointer;
`;
const Pjcontainer = styled.div`
  display: flex;
  flex-direction: raw;
  justify-content: space-between;
`;
const Icon = styled.img`
  filter: ${({ theme }) => theme.filter};
  margin: 10px;
`;
const Foldername = styled.h1`
  margin: 14px 0 0 0;
  flex-grow: 1;
  color: ${({ theme }) => theme.text};
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
`;

const modalRoot =
  document.getElementById('modal-root') ||
  (function () {
    const div = document.createElement('div');
    div.id = 'modal-root';
    document.body.appendChild(div);
    return div;
  })();

const PjList: React.FC<PjListProps> = ({ onClose }) => {
  const { themeColor } = useTheTheme();
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);
  const { projects, loadProjects, selectProject, removeProject } = useProjectStore(state => ({
    projects: state.projects,
    loadProjects: state.loadProjects,
    selectProject: state.selectProject,
    removeProject: state.removeProject,
  }));

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleProjectClick = (projectId: string) => {
    const memberId = useAuthStore.getState().memberId;
    selectProject(projectId);
    navigate(`/ide/${memberId}/${projectId}`);
    onClose();
  };
  const handleDelete = (projectId: string, projectName: string) => {
    if (window.confirm(`'${projectName}'을(를) 삭제할건가요?`)) {
      removeProject(projectId);
      console.log('Message deleted:', projectName);
    }
  };
  const currentTheme = themeColor === 'light' ? lightTheme : darkTheme;
  return ReactDOM.createPortal(
    <ThemeProvider theme={currentTheme}>
      <Overlay closing={closing}>
        <Container onClick={e => e.stopPropagation()} closing={closing}>
          <CloseModal onClick={handleClose}>x</CloseModal>
          <Myproject>내 프로젝트</Myproject>
          <Listcontainer>
            {projects.map((project: Project) => (
              <Pjcontainer key={project.id} onClick={() => handleProjectClick(project.id)}>
                <Icon src={folderLight} />
                <Foldername>{project.name}</Foldername>
                <Icon
                  src={messageTrash}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleDelete(project.id, project.name);
                  }}
                />
              </Pjcontainer>
            ))}
          </Listcontainer>
        </Container>
      </Overlay>
    </ThemeProvider>,
    modalRoot,
  );
};

export default PjList;
