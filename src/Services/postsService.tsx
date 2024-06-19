import apiClient from "./api-client";

class postsService {

    getPosts() {

        const controller = new AbortController();
        const request = apiClient.get(`/post`, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

    getPostsByLocation( lat: number, lng: number, radius: number, day: number = 100 ) {

        const controller = new AbortController();
        const request = apiClient.get(`/post?params=lat=${lat}?lng=${lng}?radius=${radius}?day=${day}`, { signal: controller.signal });
        console.log(request);
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