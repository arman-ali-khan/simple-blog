import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CategoryPost from '../../components/Category/CategoryPost';
import Layout from '../../layout/Layout';

const categoryId = () => {
    const router = useRouter();
    const {categoryId} = router.query
     // loading
     const [loading, setLoading] = useState(true);
    const [categoriesPost, setCategoriesPost] = useState([]);
    const blog = categoriesPost?.posts  
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/catetgory/${categoryId}`)
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