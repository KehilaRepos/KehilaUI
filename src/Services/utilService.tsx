import apiClient from "./api-client";

class utilService {

    getZones() {

        const controller = new AbortController();

        const request = apiClient.get(`/newsletter/zones`, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

    getAvailability() {

        const controller = new AbortController();

        const request = apiClient.get(`/newsletter/availability`, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

    signToNewsletter( data: object ) {

        const controller = new AbortController();
        const request = apiClient.post(`/newsletter`, data, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

    getNotifications( email: string ) {

        const controller = new AbortController();

        const request = apiClient.get(`/notification?user_email=${email}`, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

    readAllNotifications( email: string ) {

        const controller = new AbortController();
        const request = apiClient.post(`/notification/read/user`, {user_email: email}, {signal: controller.signal});
    
        return { request, cancel: () => controller.abort() };
        
    }

    readNotifications( nid: number ) {

        const controller = new AbortController();
        const request = apiClient.post(`/notification/read`, {nid}, {signal: controller.signal});
    
        return { request, cancel: () => controller.abort() };
        
    }

}

export const utilsService =  new utilService;