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
  
    //fetch post
    useEffect(()=>{
        if(postId){
            axios.get(`/api/post/${postId}`)
        .then(res=>{
            setPost(res.data)
        })
        }
      
    },[])
    return (
        <Layout title={`Update ${post.title?post.title:''}`}>
            <Update post={post} />
        </Layout>
    );
};

export default postId;