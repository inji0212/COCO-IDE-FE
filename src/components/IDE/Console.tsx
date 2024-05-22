import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { IconButton, Snackbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useConsoleStore from '../../state/IDE/ConsoleStore';
import { ButtonWrapper, ConsoleButton, ConsoleWrapper } from './IdeStyle';
import { useTheTheme } from '../Theme';
import { ThemeProvider } from 'styled-components';

interface Props {
  editorRef: React.MutableRefObject<any>;
  language: string;
  output: string[] | null;
  isLoading: boolean;
  isError: boolean;
  openSnackbar: boolean;
  snackbarMessage: string;
  consoleOpen: boolean;
  setConsoleOpen: (consoleOpen: boolean) => void;
  setOutput: (output: string[]) => void;
}

const Console = forwardRef((props: Props, ref) => {
  const { themeColor } = useTheTheme();
  const themeObject = {
    ButtonWrapperBackground: themeColor === 'light' ? '#ffffff' : '#011627',
  };
  const { output, setOutput, isError, openSnackbar, snackbarMessage, setOpenSnackbar, consoleOpen, setConsoleOpen } =
    useConsoleStore();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const closeConsole = () => {
    setConsoleOpen(!consoleOpen);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const inputLine = event.currentTarget.innerText.trim();

      setOutput((prevOutput: string[] | null) => {
        if (prevOutput !== null) {
          return [...prevOutput, inputLine];
        } else {
          return [inputLine];
        }
      });
      event.currentTarget.innerText = '';
    } else {
      console.error('WebSocket is not connected or sessionId is missing.');
    }
  };

  return (
    <ThemeProvider theme={themeObject}>
      {consoleOpen ? (
        <div className="flex gap-0">
          <ConsoleWrapper>
            <ButtonWrapper>
              <ConsoleButton>
                console
                <IconButton size="small" onClick={closeConsole}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </ConsoleButton>
            </ButtonWrapper>
            <div
              style={{
                width: '100%',
                height: '200px',
                padding: '20px',
                color: isError ? 'error.main' : '',
                border: '1px solid #28B381',
                borderColor: isError ? 'error.main' : 'text.primary',
                backgroundColor: themeColor === 'light' ? '#f4f4f4' : '#1C2631',
                overflow: 'auto',
              }}
            >
              {output
                ? output.map((line, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className=" rounded-r-3xl px-4 pr-5 py-1 text-black text-base"
                        style={{
                          backgroundColor: themeColor === 'light' ? '#41C464' : '#E1F9F0',
                        }}
                      >
                        Execution result
                      </div>
                      <Typography sx={{ fontSize: '20px', color: '#41C464' }}>{line}</Typography>
                    </div>
                  ))
                : 'Click "Run Code" to see the output here'}
            </div>
          </ConsoleWrapper>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          />
        </div>
      ) : null}
    </ThemeProvider>
  );
});

Console.displayName = 'Console';

export default Console;
