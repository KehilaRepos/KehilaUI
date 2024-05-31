import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { postService } from '../Services/postsService';
import { CanceledError } from '../Services/api-client';

const usePost = () => {

  const [ posts, setPosts ] = useState<Array<object>>([]);

  useEffect(() => {

    const { request , cancel } = postService.getPosts();

    request
    .then(res => {
      setPosts(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });

    return () => { cancel(); };
  
  }, []);

  return posts;

};

export default usePost;
