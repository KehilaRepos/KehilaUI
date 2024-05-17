import apiClient from "./api-client";

class signupService {

    signUp( signupEmail: string, singupPassword: string ) {

        const userSignup = {
            email: signupEmail,
            password: singupPassword,
        }

        const controller = new AbortController();
        const request = apiClient.post(`/auth/signup`, userSignup, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

}

export default new signupService;