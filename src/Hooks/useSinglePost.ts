import { useState, useEffect } from 'react';
import { postService } from '../Services/postsService';

interface Post {
  pid: number;
  cid: number;
  title: string;
  description: string;
  location: {
      x: number;
      y: number;
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
  creation_time: string | null;
  distance: number | null;
  likes: number;
  views: number;
}

const usePost = (postId: number) => {
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const { request, cancel } = postService.getSinglePost(postId);

        request.then(response => {
            // Assuming response.data.data is an array containing one Post object
            const postData = response.data.data;
            if (Array.isArray(postData) && postData.length > 0) {
                setPost(postData[0]);  // Set the first Post object from the array
            } else {
            }
        }).catch(err => {
            console.error(err);
        });

        return () => { cancel(); };
    }, [postId]);

    return { post };
};

export default usePost;
