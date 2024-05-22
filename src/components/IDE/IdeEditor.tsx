import Editor, { EditorProps, loader } from '@monaco-editor/react';
import tomorrowTheme from 'monaco-themes/themes/Tomorrow.json';
import tomorrowDarkTheme from 'monaco-themes/themes/Night Owl.json';
import * as monaco from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import useLanguageStore from '../../state/IDE/IdeStore';
import { useTheTheme } from '../Theme';
import useProjectStore from '../../state/IDE/ProjectState';
import { EditorButton } from './IdeStyle';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

loader.config({
  paths: {
    vs: '/monaco-editor/min/vs',
  },
});

const MONACO_OPTIONS: monaco.editor.IEditorConstructionOptions = {
  autoIndent: 'full',
  automaticLayout: true,
  contextmenu: true,
  fontSize: 14,
  lineHeight: 20,
  hideCursorInOverviewRuler: true,
  matchBrackets: 'always',
  minimap: {
    enabled: true,
  },
  readOnly: false,
  scrollbar: {
    horizontalSliderSize: 4,
    verticalSliderSize: 18,
  },
};

interface SelectedFileState {
  selectedProjectId: string | null;
  selectedFileId: string | null;
  selectedFileContent: string | null;
  selectedFileName: string | null;
  deselectFile: () => void;
  setFileContent: (content: string) => void;
  fetchFileContent: (projectId: string, folderId: string, fileId: string) => void;
}

export const IdeEditor: React.FC = () => {
  const editorRefs = useRef<{ [key: string]: monaco.editor.IStandaloneCodeEditor | null }>({});
  const language = useLanguageStore(state => state.language);
  const setLanguage = useLanguageStore(state => state.setLanguage);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [openFiles, setOpenFiles] = useState<{ id: string; name: string; content: string; language: string }[]>([]);

  const {
    selectedProjectId,
    selectedFileId,
    selectedFileContent,
    selectedFileName,
    deselectFile,
    setFileContent,
    fetchFileContent,
  } = useProjectStore<SelectedFileState>(state => ({
    selectedProjectId: state.selectedProjectId,
    selectedFileId: state.selectedFileId,
    selectedFileContent: state.selectedFileContent,
    selectedFileName: state.selectedFileName,
    deselectFile: state.deselectFile,
    setFileContent: state.setFileContent,
    fetchFileContent: state.fetchFileContent,
  }));

  // 테마
  const { themeColor } = useTheTheme();
  useEffect(() => {
    loader.init().then(monacoInstance => {
      try {
        monacoInstance.editor.defineTheme('tomorrow', tomorrowTheme as monaco.editor.IStandaloneThemeData);
        monacoInstance.editor.defineTheme('nightOwl', tomorrowDarkTheme as monaco.editor.IStandaloneThemeData);
        monacoInstance.editor.setTheme(themeColor === 'light' ? 'tomorrow' : 'nightOwl');
      } catch (error) {
        console.error('Error setting theme:', error);
        monacoInstance.editor.setTheme('vs-dark');
      }
    });
  }, [themeColor]);

  // 언어 선택
  useEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

  // 파일 선택 시 에디터 창 추가
  useEffect(() => {
    if (selectedFileId && selectedFileName) {
      setOpenFiles(prevOpenFiles => {
        if (prevOpenFiles.find(file => file.id === selectedFileId)) {
          return prevOpenFiles;
        }
        return [
          ...prevOpenFiles,
          {
            id: selectedFileId,
            name: selectedFileName,
            content: selectedFileContent || '',
            language,
          },
        ];
      });
      setActiveFile(selectedFileId); // 새 파일 선택 시 활성 파일 변경
    }
  }, [selectedFileId, selectedFileName, selectedFileContent, language]);

  // 파일 닫기
  const handleCloseFile = (fileId: string) => {
    setOpenFiles(prevOpenFiles => prevOpenFiles.filter(file => file.id !== fileId));
    if (editorRefs.current && editorRefs.current[fileId]) {
      editorRefs.current[fileId]?.dispose();
      editorRefs.current[fileId] = null;
    }
    // 활성 파일 변경
    if (activeFile === fileId && openFiles.length > 0) {
      setActiveFile(openFiles[0].id);
    } else if (openFiles.length === 0) {
      setActiveFile(null);
    }
  };

  // 프로젝트 아이디 변경 시 에디터 닫기
  useEffect(() => {
    setOpenFiles([]);
    deselectFile();
  }, [selectedProjectId, deselectFile]);

  // 컴포넌트가 마운트 되었을 때의 콜백함수
  const onMount =
    (fileId: string): EditorProps['onMount'] =>
    editor => {
      editorRefs.current[fileId] = editor;
      editor.onDidBlurEditorText(() => {
        const value = editor.getValue();
        setFileContent(value);
      });
      editor.focus();
    };

  useEffect(() => {
    if (activeFile && editorRefs.current[activeFile]) {
      editorRefs.current[activeFile]?.focus();
    }
  }, [activeFile]);
  const handleFileClick = async (fileId: string) => {
    const file = openFiles.find(f => f.id === fileId);
    if (!file) return;

    await fetchFileContent(selectedProjectId!, file.id, file.id); // 파일 내용 가져오기
    setActiveFile(file.id); // 활성 파일 변경
  };

  return (
    <div className="flex flex-col w-screen overflow-scroll" style={{ height: '55%' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {openFiles.map(file => (
          <EditorButton key={file.id} active={activeFile === file.id} onClick={() => handleFileClick(file.id)}>
            {file.name}
            <IconButton size="small" onClick={() => handleCloseFile(file.id)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </EditorButton>
        ))}
      </div>
      {openFiles.map(
        file =>
          activeFile === file.id && (
            <div key={file.id} style={{ flex: 1 }}>
              <Editor
                height="80vh"
                theme={themeColor === 'light' ? 'tomorrow' : 'nightOwl'}
                path={file.id}
                defaultLanguage={file.language}
                defaultValue={file.content}
                onMount={onMount(file.id)}
                options={MONACO_OPTIONS}
              />
            </div>
          ),
      )}
    </div>
  );
};
