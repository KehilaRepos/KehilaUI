import apiClient from "./api-locationIQ";

class autoCompleteService {

    requestResults( searchQuery: string ) {

        const controller = new AbortController();
        const request = apiClient.get(`/autocomplete?key=pk.b0191d38e9e104e9214133c358b37714&q=${searchQuery}&format=json&limit=10&dedupe=1`, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

}

export default new autoCompleteService;