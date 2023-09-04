import Link from 'next/link';
import { useState } from 'react';

const SingleCategory = ({category}) => {
      // loading
      const [loading, setLoading] = useState(true);
      const [categoriesPost, setCategoriesPost] = useState({});
      const posts = categoriesPost.posts
    //   useEffect(() => {
    //       axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/catetgory/${category.value}`)
    //       .then(res=>{
    //           setCategoriesPost(res.data)
    //           setLoading(false)
    //       })
    //   },[loading,category.value])
            
          return  ( <li key={category.id} className={`border-b px-2 flex items-center `}>
            <Link className="hover:text-blue-300 capitalize visited:text-purple-400 duration-300 text-blue-500 w-full flex px-3 py-2" href={`/category/${category.value}`}>{category.label} </Link> 
            {/* <span>({category?.post || 0})</span> */}
        </li>)
        
    
};

export default SingleCategory;