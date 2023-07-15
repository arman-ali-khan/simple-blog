import CategoryPost from '@/components/Category/CategoryPost';
import Layout from '@/layout/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const categoryId = () => {
    const router = useRouter();
    const {categoryId} = router.query
    console.log(categoryId);
     // loading
     const [loading, setLoading] = useState(true);
    const [categoriesPost, setCategoriesPost] = useState([]);
    const blog = categoriesPost?.posts  
    useEffect(() => {
        axios.get(`/api/category/${categoryId}`)
        .then(res=>{
            setCategoriesPost(res.data)
            setLoading(false)
        })
    },[loading,categoryId])
    return (
        <Layout title={'Category'}>
       <CategoryPost blog={blog} loading={loading} />
        </Layout>
    );
};

export default categoryId;