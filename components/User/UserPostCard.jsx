import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-hot-toast';

const UserPostCard = ({post,updatePost,setUpdatePost}) => {

  // aprove handle
  const handlePublish = (e) =>{
    axios.put(`/api/post/updatepost`,e)
    .then(res=>{
        setUpdatePost(!updatePost)
        toast.success('Updated')
    })
}
// aprove handle
const handleDraft = (e) =>{
    axios.put(`/api/post/updatepost`,e)
    .then(res=>{
        setUpdatePost(!updatePost)
        toast.success('Updated')
    })
}
    return (
        <div className="mt-1 border-t border-blueGray-200 ">
        <div className="flex flex-wrap w-full justify-center">
          <div className="w-full">
          <div className="flex flex-row overflow-hidden md:h-32 bg-base-100 sm:h-24 border shadow-lg">
    <img
      className="block md:w-44 w-28  flex-none bg-cover md:h-auto h-24 object-cover"
      src={post.featured_image}
    />
    <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal">
      <div className="font-bold md:text-xl sm:text-base text-sm mb-2 leading-tight">
       <Link href={`/blog/${post.postId}`}> {post.title}</Link>
       <span className='border px-2 ml-2 text-info rounded-full py-0 inline-block'>{post?.publish?'':'Darft'} { post?.publish &&  (post?.aproved ? 'Aproved':'Pending')}</span>
      </div>
      <div className="flex gap-3">
        {/* <Link href={`/update/${post.postId}`} className="px-2 py-1 text-blue-400" onClick={()=>setEditId(post?.postId)}>Edit</Link> */}
       {
        !post?.publish ? <button onClick={()=>handlePublish({postId:post.postId,publish:true})} className={`px-2 py-1 ${post?.publish?'text-warning':'text-success'}`}>Publish</button>
        :
        <button onClick={()=>handleDraft({postId:post.postId,publish:false})} className={`px-2 py-1 ${post?.publish?'text-warning':'text-success'}`}>Unpublish</button>
       } 
       
        <button className="px-2 py-1 text-error">Delete</button>
      </div>
    </div>
  </div>
          </div>
        </div>
       
      </div>
    );
};

export default UserPostCard;