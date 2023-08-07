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
    axios.put(`${process.env.NEXT_PUBLIC_API_PRO}/api/posts/update/${post.id}`,e)
    .then(res=>{
        setUpdatePost(!updatePost)
        toast.success('Updated')
    })
}
// aprove handle
const handleDraft = (e) =>{
    axios.put(`${process.env.NEXT_PUBLIC_API_PRO}/api/posts/update/${post.id}`,e)
    .then(res=>{
        setUpdatePost(!updatePost)
        toast.success('Updated')
    })
}


// get comment count 
const [count,setCount] = useState('')
useEffect(()=>{
  axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/comments?id=${post.id}`)
  .then(res=>{
    setCount(res.data)
  })
},[])

// handle delete
const [deleteId,setDeleteId] = useState()
// email verify
const [inputEmail,setInputEmail] = useState('')
// delete btn
const [deleteBtn,setDeleteBtn] = useState('Delete')
// confirm delete 
const handleDelete = (id) =>{
  setDeleteBtn('Deleting...')
  axios.delete(`http://localhost:5000/api/posts/${id}`)
  .then(res=>{
    console.log(res.data)
    setDeleteBtn('Deleted')
    setUpdatePost(!updatePost)
  })
}
    return (
        <div className="mt-1 border-t border-blueGray-200 ">
        <div className="flex flex-wrap md:h-auto w-full justify-center">
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
     <div className='flex items-center flex-wrap'>
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
       
        <button onClick={()=>setDeleteId(post.id)} className="px-2 py-1 text-error">Delete</button>
      </div>
      :''
    }
    </div>
    
   
  </div>
          </div>
        </div>
       {
        deleteId ? <div  className='fixed z-40 flex items-center justify-center top-0 left-0 h-screen w-full'>
          <button onClick={()=>setDeleteId()} className='fixed top-0 left-0 w-full h-screen'></button>
          <div className='sm:w-[450px] z-50 w-full sm:h-72 h-72 flex flex-col relative  justify-center bg-base-300 items-center border py-9'>
            <div className='text-left px-2 bg-blue-400 absolute top-0 h-12 items-center flex w-full'>
              <h2 className='md:text-xl text-white truncate font-bold w-full'>Delete {post.title}</h2>
            </div>
           <div className='mt-6'>
           <div className='px-4 flex justify-center'>
              <p className='text-error text-xs sm:text-lg'>You can't restore this post after delete</p>
            </div>
            <div className='px-4 py-2 flex justify-center'>
              <p className='text-warning  text-xs sm:text-lg font-bold truncate'>Are you sure want to delete this post?</p>
            </div>
            <div className='flex justify-center w-full'>
             
            <div className='w-full'>
            <p className='flex items-center gap-2 pb-2 w-full px-2  text-xs sm:text-base'>Enter your username <span className='bg-blue-400 flex items-center px-2 text-black'>{user?.email}</span></p>
           <div className='flex items-center w-full'>
           <input onChange={(e)=>setInputEmail(e.target.value)} placeholder={user?.email} className={`px-3 w-full text-error border py-2 ${inputEmail===user?.email ? 'border-success focus-visible:outline-success focus-visible:outline text-success':'border-error focus-visible:outline-error focus-visible:outline text-error'}`} type="text" id="username" />
              <button disabled={inputEmail!==user?.email} onClick={()=>handleDelete(deleteId)} className='px-4 py-2 disabled:bg-neutral disabled:text-white disabled:cursor-not-allowed border border-error bg-error hover:bg-opacity-80 duration-300 text-black'>{deleteBtn}</button>
           </div>
              <div onClick={()=>setDeleteId()} className='flex justify-center my-2'>
              <button  className='px-4 py-2 bg-success text-black flex justify-center text-center'>Cancel</button>
              </div>
            </div>
            </div>
         
           </div>
          </div>
        </div> :''
       }
      </div>
    );
};

export default UserPostCard;