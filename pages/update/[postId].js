import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Update from '../../components/Post/Update';
import Layout from '../../layout/Layout';

const postId = () => {
    // router
    const router = useRouter()
    // get query
    const {postId} = router.query
    // get post by query
    const [post,setPost] = useState({})

    // get post id
  const [loading,setLoading] = useState(true)
    //fetch post
    useEffect(()=>{
        setLoading(true)
        if(postId){
            axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/posts/${postId}`)
        .then(res=>{
            setPost(res.data)
            setLoading(false)
        })
        }
      
    },[postId])
    return (
        <Layout title={`Update ${post.title?post.title:''}`}>
            {
                loading ? <div className='h-screen w-full flex items-center justify-center'>Loading...</div>
                :
                <Update post={post} />
            }
          
        </Layout>
    );
};

export default postId; 