import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import verifyEmailService from '../Services/verifyEmailService';

interface Props {
    openVerifyEmailDialog: boolean
    setOpenVerifyEmailDialog: (open: boolean) => void
    setAuth: (auth: boolean) => void
}

const VerifyEmailDialog = ({openVerifyEmailDialog, setOpenVerifyEmailDialog, setAuth}: Props) => {

  const [message, setMessage] = React.useState("");

  const handleClose = () => {
    setOpenVerifyEmailDialog(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    const code = formJson.code;

    const isTryingToVerify = event.nativeEvent.submitter.classList.contains('verify');

    if( isTryingToVerify ) {

      const { request } = verifyEmailService.verifyEmail( email, code );

      request
      .then(res => {
  
        if(res.data.success) { // success
          /*
          * TODO:: Verify accessToken before login 
          */
          localStorage.setItem('userEmail', email);
          setAuth(true);
          setMessage('');
          handleClose();
        }
        else { // something wrong
          setMessage( "Invalid code, please try again." );
        }
      })
      .catch(err => {
        console.log(err);
      });
  
    }
    else {
      // Resend email verification
      
      const { request } = verifyEmailService.resendVerificationEmail( email );

      request
      .then(res => {
        console.log(res.data);
        setMessage("Code has been resent");
      })
      .catch(err => {
        console.log(err);
      });

    } // move to the other screen

  };

  return (
    <>
      <Dialog
        open={openVerifyEmailDialog}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleFormSubmit,
        }}
      >
        <DialogTitle>Verify Email</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{pb: 0}}>
            {/* content */}
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="code"
            name="code"
            label="Code"
            type="text"
            fullWidth
            variant="standard"
          />
          <DialogContentText sx={{pt: 2, color: 'black'}}>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="submit" className='resend'>Resend CODE</Button>
          <Button type="submit" className='verify'>Verify</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default VerifyEmailDialog;