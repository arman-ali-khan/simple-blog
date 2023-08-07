import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/ContextProvider';

const UserPostCard = ({post,updatePost,setUpdatePost}) => {
// user
const {user} = useContext(UserContext)
  // aprove handle
  const handlePublish = (e) =>{
    axios.put(`http://localhost:5000/api/posts/update/${post.id}`,e)
    .then(res=>{
        setUpdatePost(!updatePost)
        toast.success('Updated')
    })
}
// aprove handle
const handleDraft = (e) =>{
    axios.put(`http://localhost:5000/api/posts/update/${post.id}`,e)
    .then(res=>{
        setUpdatePost(!updatePost)
        toast.success('Updated')
    })
}


// get comment count 
const [count,setCount] = useState('')
useEffect(()=>{
  axios.get(`http://localhost:5000/api/comments?id=${post.id}`)
  .then(res=>{
    setCount(res.data)
  })
},[])
    return (
        <div className="mt-1 border-t border-blueGray-200 ">
        <div className="flex flex-wrap md:h-auto h-24 w-full justify-center">
          <div className="w-full">
          <div className="flex flex-row overflow-hidden bg-base-100 border shadow-lg">
    <Image
      className="block md:w-32 w-28  flex-none bg-cover md:h-auto h-24 object-cover"
      src={post.featured_image}
      width={128}
      alt={post.email}
      height={96}
    />
   
      <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal">
      <div className="font-bold md:text-xl sm:text-base text-sm mb-2 leading-tight">
       <Link className='text-blue-500' href={`/blog/${post.id}`}> {post.title}</Link>
     <div className='flex items-center'>
     <div className='text-sm flex gap-7'>
        <p>View: {post.view}</p>
        <p>Comments: {count.count}</p>
        <p>{moment(post.data).calendar()}</p>
       </div>
       {
        post.email === user?.email ?  <span className='border text-sm px-2 ml-2 text-info rounded-full py-0 inline-block'>{post?.publish?'':'Darft'} { post?.publish ?  (post?.aproved ? 'Aproved':'Pending') :''}</span>:''
       }
      
     </div>
      </div>
      {
      post.email === user?.email ? 
      <div className="flex gap-3">
        {/* <Link href={`/update/${post.postId}`} className="px-2 py-1 text-blue-400" onClick={()=>setEditId(post?.postId)}>Edit</Link> */}
       {
        post?.publish===0 ? <button onClick={()=>handlePublish({publish:1})} className={`px-2 py-1 ${post?.publish===1?'text-warning':'text-success'}`}>Publish</button>
        :
        <button onClick={()=>handleDraft({publish:0})} className={`px-2 py-1 ${post?.publish===1?'text-warning':'text-success'}`}>Unpublish</button>
       } 
       
        <button className="px-2 py-1 text-error">Delete</button>
      </div>
      :''
    }
    </div>
    
   
  </div>
          </div>
        </div>
       
      </div>
    );
};

export default UserPostCard;