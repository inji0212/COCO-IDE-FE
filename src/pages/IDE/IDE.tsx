import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import * as monaco from 'monaco-editor';
import { IdeEditor } from '../../components/IDE/IdeEditor';
import { useTheTheme } from '../../components/Theme';
import Console from '../../components/IDE/Console';
import FileList from '../../components/IDE/FileTree/FileList';
import { ReactComponent as ChatlightIcon } from '../../assets/chatlight.svg';
import { ReactComponent as FolderlightIcon } from '../../assets/folderlight.svg';
import { ReactComponent as FolderDarkIcon } from '../../assets/folderdark.svg';
import { ReactComponent as ChatDarkIcon } from '../../assets/chatdark.svg';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { Button, IconButton } from '@mui/material';
import { ButtonContainer, Container, CustomButton, IconContainer, FileListContainer, IDEContainer } from './IdeStyles';
import useLanguageStore from '../../state/IDE/IdeStore';
import { fetchRunCode, saveCode } from '../../components/IDE/ProjectApi';
import useConsoleStore from '../../state/IDE/ConsoleStore';
import useProjectStore from '../../state/IDE/ProjectState';
import useAuthStore from '../../state/AuthStore';
import PjList from '../../components/\bPjList';
import { Loading } from '../../components/IDE/Loading';

export default function IDE() {
  const consoleRef = useRef<any>(null);

  const { themeColor } = useTheTheme();
  const themeObject = {
    buttonBackground: themeColor === 'light' ? '#f4f4f4' : '#18293D',
    fileListBackground: themeColor === 'light' ? '#fffff' : '#243B56',
    ideBackground: themeColor === 'light' ? '#fffff' : '#243B56',
  };
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const language = useLanguageStore(state => state.language);
  const {
    output,
    isLoading,
    isError,
    setIsLoading,
    openSnackbar,
    snackbarMessage,
    consoleOpen,
    setConsoleOpen,
    setOutput,
  } = useConsoleStore();
  const { selectedProjectId, selectedFolderId, selectedFileId, selectedFileContent } = useProjectStore(state => ({
    selectedProjectId: state.selectedProjectId,
    selectedFolderId: state.selectedFolderId,
    selectedFileId: state.selectedFileId,
    selectedFileContent: state.selectedFileContent,
  }));
  const [showPjList, setshowPjList] = useState(false);
  const { memberId } = useAuthStore();
  const handleSave = async () => {
    const sourceCode = selectedFileContent;
    try {
      await saveCode(selectedProjectId, selectedFolderId, selectedFileId, sourceCode);
      console.log('코드가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('코드 저장에 실패했습니다.', error);
    }
  };

  useEffect(() => {
    const handleSaveShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        handleSave();
      }
    };

    document.addEventListener('keydown', handleSaveShortcut);

    return () => {
      document.removeEventListener('keydown', handleSaveShortcut);
    };
  }, []);

  const runCode = async () => {
    setIsLoading(true);
    setConsoleOpen(true);
    setOutput(() => []);

    try {
      useConsoleStore.setState({ isLoading: true });
      const response = await fetchRunCode(selectedProjectId, selectedFolderId, selectedFileId);
      console.log('Received from server:', response);
      setIsLoading(false);
      setOutput(prevOutput => (prevOutput ? [...prevOutput, response] : [response]));
    } catch (error) {
      console.log(error);
      useConsoleStore.setState({ snackbarMessage: 'Unable to run code', openSnackbar: true });
    } finally {
      useConsoleStore.setState({ isLoading: false });
    }
  };
  const togglePJList = () => {
    setshowPjList(!showPjList);
    console.log('Current showPjList before toggle:', showPjList);
  };
  return (
    <ThemeProvider theme={themeObject}>
      <Container>
        <ButtonContainer>
          <Button
            color="success"
            variant="contained"
            sx={{
              margin: 'auto',
              backgroundColor: '#41C464',
              '&:hover': {
                backgroundColor: '#5BC48E',
                color: '#11724F',
              },
            }}
            onClick={runCode}
          >
            <PlayArrowOutlinedIcon />
            RUN
          </Button>
          <Button
            color="success"
            variant="contained"
            sx={{
              backgroundColor: '#23BE87',
              marginRight: '42px',
              '&:hover': {
                backgroundColor: '#5BC48E',
                color: '#11724F',
              },
            }}
            onClick={handleSave}
          >
            SAVE
          </Button>
        </ButtonContainer>
        <div className="flex ">
          <IconContainer>
            <IconButton onClick={togglePJList}>
              {themeColor === 'light' ? <FolderlightIcon /> : <FolderDarkIcon />}
            </IconButton>
            {showPjList && <PjList onClose={() => setshowPjList(false)} />}
            <IconButton>
              <Link to={`/chat/${memberId}`}>{themeColor === 'light' ? <ChatlightIcon /> : <ChatDarkIcon />}</Link>
            </IconButton>
          </IconContainer>
          <FileListContainer>
            <FileList />
          </FileListContainer>
          <IDEContainer>
            <IdeEditor />
            {isLoading ? (
              <Loading />
            ) : (
              <Console
                ref={consoleRef}
                editorRef={editorRef}
                language={language}
                output={output}
                isLoading={isLoading}
                isError={isError}
                openSnackbar={openSnackbar}
                snackbarMessage={snackbarMessage}
                consoleOpen={consoleOpen}
                setConsoleOpen={setConsoleOpen}
                setOutput={(newOutput: string[]) => setOutput(() => newOutput)}
              />
            )}
          </IDEContainer>
        </div>
      </Container>
    </ThemeProvider>
  );
}
