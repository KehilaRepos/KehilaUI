import Typography from "@mui/material/Typography";
import { useState } from "react";
import LoginDialog from "./LoginDialog";
import VerifyEmailDialog from "./verifyEmailDialog";
import useLogin from '../Hooks/useLogin'
import loginService from "../Services/loginService";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface Props {

};

const Login = ( {}: Props ) => {

    const [openVerifyEmailDialog, setOpenVerifyEmailDialog] = useState(false);
    const [isAuth, setAuth] = useLogin();

    const LogoutCallback = () => {
        loginService.Logout();
        setAuth(false);
    };

    if(!isAuth) {
        return (
            <>
                <LoginDialog setAuth={setAuth} setOpenVerifyEmailDialog={setOpenVerifyEmailDialog} />
                <VerifyEmailDialog openVerifyEmailDialog={openVerifyEmailDialog} setOpenVerifyEmailDialog={setOpenVerifyEmailDialog} setAuth={setAuth} />
            </>
        )
    }
    else {
        return (
            <>

                <Typography onClick={LogoutCallback}>
                    <AccountCircleIcon sx={{
                        height: 'auto',
                        width: 35,
                        '&:hover': {
                        color: '#b78fd6',
                        cursor: 'pointer'
                        },
                    }} />
                </Typography>
            </>

        )
    }

};

export default Login;