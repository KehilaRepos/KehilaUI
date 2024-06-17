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

}

export const utilsService =  new utilService;