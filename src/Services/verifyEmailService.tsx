import apiClient from "./api-client";

class verifyEmailService {

    verifyEmail( email: string, code: string ) {

        const verifyEmail = {
            email: email,
            code: code,
        }

        const controller = new AbortController();
        const request = apiClient.post(`/auth/verifyEmail`, verifyEmail, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

    resendVerificationEmail( email: string ) {

        const resendEmail = {
            email: email,
        }

        const controller = new AbortController();
        const request = apiClient.post(`/auth/resendEmailVerification`, resendEmail, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

}

export default new verifyEmailService;