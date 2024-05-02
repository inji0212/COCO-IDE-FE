import React, { useState } from 'react';
import { IconButton, Snackbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from 'styled-components';

interface Props {
  editorRef: React.MutableRefObject<any>;
  language: string;
}
const ConsoleButton = styled.div`
  width: max-content;
  height: auto;
  background-color: #28b381;
  color: black;
  padding: 8px;
  font-size: 16px;
`;

const Console: React.FC<Props> = () => {
  const [output] = useState<string[] | null>(null);
  const [isError] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage] = useState<string>('');

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <ConsoleButton>
        console
        <IconButton size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </ConsoleButton>
      <div
        style={{
          width: 'auto',
          height: '200px',
          padding: '8px',
          color: isError ? 'error.main' : '',
          border: '0.5px solid',
          borderColor: isError ? 'error.main' : 'text.primary',
          overflow: 'auto',
          fontSize: '18px',
        }}
      >
        {output
          ? output.map((line, i) => <Typography key={i}>{line}</Typography>)
          : 'Click "Run Code" to see the output here'}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </div>
  );
};

export default Console;
