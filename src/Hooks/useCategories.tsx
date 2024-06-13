import { useState, useEffect } from 'react';
import { postService } from '../Services/postsService';

interface Category {
  cid: number;
  category_name: string;
  parent_cid: number | null;
};

const useCategories = () => {

  const [ categories, setCategories ] = useState<Category[]>([]);

  useEffect(() => {

    const { request , cancel } = postService.getCategories();

    request
    .then(res => {
      setCategories(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });

    return () => { cancel(); };
  
  }, []);

  return categories;

};

export default useCategories;
