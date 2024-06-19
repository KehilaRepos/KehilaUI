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
}

const usePostByLocation = ( lat: number, lng: number, radius: number, day: number = 100 ) => {

  const [ postsByLocation, setPostsByLocation ] = useState<Post[]>([]);

  useEffect(() => {

    const { request , cancel } = postService.getPostsByLocation(lat, lng, radius, day);

    request
    .then(res => {
        setPostsByLocation(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });

    return () => { cancel(); };
  
  }, []);

  return postsByLocation;

};

export default usePostByLocation;
