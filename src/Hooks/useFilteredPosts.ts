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
  distance: number;
}

const useFilteredPosts = (filters: string) => {

  const [ posts, setPosts ] = useState<Post[]>([]);

  useEffect(() => {

    const { request , cancel } = postService.getFilteredPosts( filters );

    request
    .then(res => {
      setPosts(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });

    console.log("rerendered", filters);

    return () => { cancel(); };
  
  }, [ filters ]);

  return posts;

};

export default useFilteredPosts;


