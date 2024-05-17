import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import loginService from '../Services/loginService';
import signupService from '../Services/signupService';

interface Props {
    setOpenVerifyEmailDialog: (open: boolean) => void
    setAuth: (authState: boolean) => void
}

const LoginDialog = ({setAuth, setOpenVerifyEmailDialog}: Props) => {
  const [open, setOpen] = React.useState(false);

  const [loginMessage, setLoginMessage] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());
      const email = formJson.email;
      const password = formJson.password;

      const isTryingToLogin = event.nativeEvent.submitter.classList.contains('login');

      if(isTryingToLogin) {

        const { request } = loginService.Login( email, password );

        request
        .then(res => {
          console.log(res.data);
          if(res.data.success) {
            setLoginMessage("Logged in successfully!");
            setAuth(true);
            localStorage.setItem('accessToken', res.data);
            localStorage.setItem('userEmail', email);
          }
          else {
            if(res.data.message === 'Please verify your email address to proceed with login.') {
              handleClose();
              localStorage.setItem('accessToken', res.data);
              setOpenVerifyEmailDialog(true);
            }
            setLoginMessage(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });

        setTimeout(() => {
          handleClose();
          setLoginMessage('');
        }, 3000);

      }
      else {

        const { request } = signupService.signUp( email, password );

        request
        .then(res => {
          if(res.data.success) {
            setLoginMessage("Registered successfully!\n Please Login");
          }
          else {
            setLoginMessage(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });

        // setTimeout(() => {
        //   handleClose();
        //   setLoginMessage('');
        // }, 3000);

      }

  };

  return (
    <React.Fragment>
      <Typography onClick={handleClickOpen}>
        <LoginIcon sx={{
            height: 'auto',
            width: 35,
            '&:hover': {
            color: '#b78fd6',
            cursor: 'pointer'
            },
            }} />
    </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleFormSubmit,
        }}
      >
        <DialogTitle>Login / Sign-up</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{pb: 0}}>
            To login or register to this website, please enter your email and password here.
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
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <DialogContentText sx={{pt: 2, color: 'black'}}>
            {loginMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="submit" className='login'>Login</Button>
          <Button type="submit" className='signup'>Signup</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default LoginDialog;