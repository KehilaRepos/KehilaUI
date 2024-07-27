import apiClient from "./api-locationIQ";

class autoCompleteService {

    requestResults( searchQuery: string ) {

        const controller = new AbortController();
        const request = apiClient.get(`/autocomplete?key=pk.c891cf52e3c6aa5d2c318cde030976f0&q=${searchQuery}&format=json&limit=10&dedupe=1`, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

}

export default new autoCompleteService;