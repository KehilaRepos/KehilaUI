import apiClient from "./api-client";
/*
interface User {
    id: number,
    email: string
}*/

class LoginService {

    checkLoggedIn() : boolean {

        const checkToken = localStorage.getItem('accessToken');

        if(checkToken) {
            return true;
        }

        return false;

    }

    Login( loginEmail: string, loginPassword: string ) {

        const userLogin = {
            email: loginEmail,
            password: loginPassword,
        }

        const controller = new AbortController();
        const request = apiClient.post(`/auth/login`, userLogin, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

    Logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userEmail');
    }

}

export default new LoginService;