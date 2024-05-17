import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import loginService from '../Services/loginService';
import { CanceledError } from '../Services/api-client';

const useLogin = () : [ boolean, Dispatch<SetStateAction<boolean>> ] => {

  const [isAuth, setAuth] = useState(loginService.checkLoggedIn());

  useEffect(() => {

    if (!isAuth) {

      // const { request, cancel } = loginService.Login();

      // request
      //   .then(res => {
      //     // localStorage.setItem('accessToken', res.data);
      //     // localStorage.setItem('userEmail', 'mary19@yahoo.com');
      //     // setAuth(true);
      //   })
      //   .catch(err => {
      //     if (err instanceof CanceledError) return;
      //     console.error(err.message);
      //   });

      // return () => {
      //   //cancel();
      // };

    }

  }, [isAuth]);

  return [ isAuth, setAuth ];

};

export default useLogin;
