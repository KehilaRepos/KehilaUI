import apiClient from "./api-client";

class postsService {

    getPosts() {

        const controller = new AbortController();
        const request = apiClient.get(`/post`, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

    getCategories( orderby: string = "" ) {

        const controller = new AbortController();

        const params = orderby === "" ? "" : `?orderby=${orderby}`;

        const request = apiClient.get(`/categories${params}`, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

}

export const postService =  new postsService;