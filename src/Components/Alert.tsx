// @ts-nocheck
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    textContent: string
    open: boolean
    alertType: 'success' | 'error'
    setOpen: (open: boolean) => void
}

const TransitionAlert = ( { textContent, open, alertType, setOpen }: Props ) => {

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity={alertType}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {textContent}
        </Alert>
      </Collapse>
    </Box>
  );
}

export default TransitionAlert;