import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SingleCategory = ({category}) => {
      // loading
      const [loading, setLoading] = useState(true);
      const [categoriesPost, setCategoriesPost] = useState({});
      const posts = categoriesPost.posts
      useEffect(() => {
          axios.get(`http://localhost:5000/api/catetgory/${category.value}`)
          .then(res=>{
              setCategoriesPost(res.data)
              setLoading(false)
          })
      },[loading,category.value])
    return (
        <li key={category.id} className={`border-b flex items-center `}>
        <Link className="hover:text-blue-300 capitalize visited:text-purple-400 duration-300 text-blue-500 w-full flex px-3 py-2" href={`/category/${category.value}`}>{category.label} </Link> <span>({loading?0:posts.length || 0})</span>
    </li>
    );
};

export default SingleCategory;