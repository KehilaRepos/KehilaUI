import apiClient from "./api-client";

class postsService {

    getPosts() {

        const controller = new AbortController();
        const request = apiClient.get(`/post`, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

}

export const postService =  new postsService;