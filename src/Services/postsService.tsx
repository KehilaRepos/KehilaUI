import apiClient from "./api-client";

export interface Post {
    cid: number;
    title: string;
    description: string;
    location: {
        lat: number;
        lng: number;
    };
    expiration_time: string;
    target: number;
    contact_email: string;
    contact_phone: string | null;
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
    website: string | null;
    contact_name: string | null;
    has_image: boolean;
    user_email: string;
    file: File | null;
}

class postsService {

    getPosts() {

        const controller = new AbortController();
        const request = apiClient.get(`/post`, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

    getSinglePost( postId: number ) {

        const controller = new AbortController();
        const request = apiClient.get(`/post?pid=${postId}`, { signal: controller.signal });

        return { request, cancel: () => controller.abort() }

    }

    createPost(postData: FormData) {
        const controller = new AbortController();
        const request = apiClient.post(`/post`, postData, {
            headers: {
                'Content-Type': 'multipart/form-data', // This is usually not needed as browsers set it correctly with the correct boundary
            },
            signal: controller.signal
        });
    
        return { request, cancel: () => controller.abort() };
    }
    
    getPostsByLocation( lat: number, lng: number, radius: number, day: number = 100 ) {

        const controller = new AbortController();
        const request = apiClient.get(`/post?params=lat=${lat}?lng=${lng}?radius=${radius}?day=${day}`, { signal: controller.signal });
        return { request, cancel: () => controller.abort() }

    }

    getFilteredPosts( filters: string ) {
        const controller = new AbortController();
        const request = apiClient.get(`/post${filters}`, { signal: controller.signal });
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