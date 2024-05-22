import { IconButton } from '@mui/material';
import { ReactComponent as FileAddLightIcon } from '../../../assets/file-addlight.svg';
import { ReactComponent as FileAddDarkIcon } from '../../../assets/file-adddark.svg';
import { ReactComponent as FolderAddLightIcon } from '../../../assets/folder-addlight.svg';
import { ReactComponent as FolderAddDarkIcon } from '../../../assets/folder-adddark.svg';
import { useTheTheme } from '../../Theme';
import useProjectStore from '../../../state/IDE/ProjectState';
import { useState } from 'react';
import { FileTreeWrapper, ProjectWrapper, Title, TreeWrapper } from '../IdeStyle';
import { createFolder, createFile } from '../ProjectApi';
import FileTree from './FileTree';

export default function FileList() {
  const { themeColor } = useTheTheme();
  const projects = useProjectStore(state => state.projects);
  const selectedProjectId = useProjectStore(state => state.selectedProjectId);
  const { addFolder, addFile } = useProjectStore();
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [currentParentId, setCurrentParentId] = useState<string | null>(null);

  const handleCreateFolder = async (folderName: string, parentId: string | null) => {
    if (folderName.trim() === '') {
      alert('폴더명을 입력하세요.');
      return;
    }
    if (!selectedProjectId) {
      alert('프로젝트를 선택하세요.');
      return;
    }
    try {
      const createdFolder = await createFolder(selectedProjectId, folderName, parentId);
      addFolder(selectedProjectId, createdFolder);
      setIsCreatingFolder(false);
      setNewFolderName('');
    } catch (error) {
      console.error('Error creating folder:', error);
      alert('Failed to create folder');
    }
  };

  const handleCreateFile = async (fileName: string, folderId: string) => {
    if (fileName.trim() === '') {
      alert('파일명을 입력하세요.');
      return;
    }
    if (!selectedProjectId) {
      alert('프로젝트를 선택하세요.');
      return;
    }
    try {
      const newFile = {
        name: fileName,
        content: '',
        type: 'file',
        parentId: folderId,
      };

      const createdFile = await createFile(selectedProjectId, folderId, fileName, newFile.content);
      addFile(selectedProjectId, folderId, createdFile);
      setIsCreatingFile(false);
      setNewFileName('');
    } catch (error) {
      console.error('Error creating file:', error);
      alert('Failed to create file');
    }
  };

  const selectedProject = projects.find(project => project.id === selectedProjectId);

  return (
    <ProjectWrapper>
      <Title>
        {selectedProject && <span className="mr-3">{selectedProject.name}</span>}
        <span>
          <IconButton
            size="small"
            onClick={() => {
              setIsCreatingFolder(!isCreatingFile);
              setCurrentParentId('0');
            }}
          >
            {themeColor === 'light' ? <FolderAddLightIcon /> : <FolderAddDarkIcon />}
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              setIsCreatingFile(!isCreatingFile);
              setCurrentParentId('0');
            }}
          >
            {themeColor === 'light' ? <FileAddLightIcon /> : <FileAddDarkIcon />}
          </IconButton>
        </span>
      </Title>
      <TreeWrapper>
        <FileTree
          isCreatingFolder={isCreatingFolder}
          setIsCreatingFolder={setIsCreatingFolder}
          setIsCreatingFile={setIsCreatingFile}
          isCreatingFile={isCreatingFile}
          handleCreateFolder={handleCreateFolder}
          handleCreateFile={handleCreateFile}
          newFolderName={newFolderName}
          setNewFolderName={setNewFolderName}
          newFileName={newFileName}
          setNewFileName={setNewFileName}
          currentParentId={currentParentId}
          setCurrentParentId={setCurrentParentId}
        />
      </TreeWrapper>
    </ProjectWrapper>
  );
}
