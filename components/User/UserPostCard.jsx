import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineComment } from 'react-icons/ai';
import { GrLineChart } from 'react-icons/gr';
import { IoCalendarClearOutline, IoWarning } from 'react-icons/io5';
import { UserContext } from '../../context/ContextProvider';

const UserPostCard = ({post,updatePost,setUpdatePost}) => {
  
  // router
  const router = useRouter()
// user
const {user,logOut} = useContext(UserContext)

  // aprove handle
  const handlePublish = (e) =>{
    axios.put(`${process.env.NEXT_PUBLIC_API_PRO}/api/posts/update/${post.id}`,e,{
      headers: {
        authorization: `basic ${Cookies.get('token')}`,
        email: post.email
      }
    })
    .then(res=>{
        setUpdatePost(!updatePost)
        toast.success('Updated')
    })
}
// aprove handle
const handleDraft = (e) =>{
    axios.put(`${process.env.NEXT_PUBLIC_API_PRO}/api/posts/update/${post.id}`,e,{
      headers: {
        authorization: `basic ${Cookies.get('token')}`,
        email: post.email
      }
    })
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
  axios.delete(`${process.env.NEXT_PUBLIC_API_PRO}/api/posts/${id}`,{
    headers:{
      authorization: `Basic ${Cookies.get('token')}`,
      email : user?.email
    }
  })
  .then(res=>{
    setDeleteBtn('Deleted')
    setUpdatePost(!updatePost)
  })
  .catch(err=>{
    if(err?.response?.status===401){
      logOut().then(() => {
        router.push(`/start/login`)
      })
    }
  })
}
    return (
        <div className="mt-1 border-t ">
        <div className="flex flex-wrap md:h-auto w-full justify-center">
          <div className="w-full">
          <div className="flex flex-row overflow-hidden bg-base-100 border shadow-lg">
          <Image
          className="block md:w-44 w-16 sm:w-24 border-2 md:border-4 border-blue-400 flex-none bg-cover md:h-auto h-16 sm:h-24 object-cover"
          src={post.featured_image}
          width={176}
          height={96}
          alt={post.email}
        />
   
      <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal">
      <div className="font-bold sm:text-base text-xs mb-2 leading-tight">
       <Link className='text-blue-500 md:text-base' href={`/blog/${post.id}`}> {post.title}</Link>
       {
        post.email === user?.email ?  <span className='border text-sm px-2 ml-2 text-info rounded-full py-0 inline-block'>{post?.publish?'':'Darft'} { post?.publish ?  (post?.aproved ? 'Aproved':'Pending') :''}</span>:''
       }
     <div className='flex items-center flex-wrap'>
     <div className='text-sm flex gap-7'>
        <p className='flex items-center gap-2'><GrLineChart /> {post.view}</p>
        <p className='flex items-center gap-2'><AiOutlineComment size={20} /> {count.count}</p>
        <p className='flex items-center gap-2'><IoCalendarClearOutline />{moment(post.date).fromNow()}</p>
       </div>
      
      
     </div>
      </div>
      {
      post.email === user?.email ? 
      <div className="flex text-sm gap-3">
       {
        post?.publish===0 ? <button onClick={()=>handlePublish({publish:1})} className={`px-2 py-1 border rounded-full sm:font-bold ${post?.publish===1?'text-warning':'text-success'}`}>Publish</button>
        :
        <button onClick={()=>handleDraft({publish:0})} className={`px-2 py-1 border rounded-full sm:font-bold ${post?.publish===1?'text-warning':'text-success'}`}>Unpublish</button>
       } 
       
        <Link href={`/update/${post.id}`} className="px-2 inline-block py-1 border rounded-full sm:font-bold text-success">Update</Link>
        <button onClick={()=>setDeleteId(post.id)} className="px-2 py-1 border rounded-full sm:font-bold text-error">Delete</button>
      </div>
      :''
    }
    </div>
    
   
  </div>
          </div>
        </div>
        {/* Delete modal */}
       {
        deleteId ? <div  className='fixed z-40 flex items-center justify-center top-0 left-0 h-screen w-full'>
          <button onClick={()=>{
            setDeleteId()
            setInputEmail('')
          }} className='fixed top-0 left-0 w-full h-screen'></button>
          <div className='sm:w-[450px] z-50 w-full sm:h-72 h-72 flex flex-col relative  justify-center bg-base-100 shadow-xl rounded-md items-center border py-9'>
            <div className='text-left px-2 bg-orange-400 rounded-md absolute top-0 h-12 items-center flex w-full'>
              <h2 className='md:text-xl text-white truncate font-bold w-full'>Delete {post.title}</h2>
            </div>
           <div className='mt-6'>
           <div className='px-4 flex justify-center'>
              <p className='text-error text-xs sm:text-lg flex items-center gap-1'> <IoWarning /> You can't restore this post after delete</p>
            </div>
            <div className='px-4 py-2 flex justify-center'>
              <p className='text-xs sm:text-lg font-bold truncate'>Are you sure want to delete this post?</p>
            </div>
            <div className='flex justify-center w-full'>
             
            <div className='w-full'>
            <p className='flex items-center gap-2 pb-2 w-full px-2  text-xs sm:text-base'>Enter your email <span className='bg-base-300 flex items-center px-2'>{user?.email}</span></p>
           <div className='flex items-center w-full'>
           <input autocomplete="off" onChange={(e)=>setInputEmail(e.target.value)} placeholder={'email'} className={`px-3 w-full text-error border py-2 ${inputEmail===user?.email ? 'border-success focus-visible:outline- focus-visible:outline text-success':'border-error focus-visible:outline-error focus-visible:outline text-error'}`} type="text" id="username" />
              <button disabled={inputEmail!==user?.email} onClick={()=>handleDelete(deleteId)} className='px-4 py-2 disabled:bg-base-300 disabled:text-zinc-500 disabled:cursor-not-allowed border border-error bg-error hover:bg-opacity-80 duration-300 text-black'>{deleteBtn}</button>
           </div>
              <div onClick={()=>{
                setDeleteId()
                setInputEmail('')
              }} className='flex justify-center my-2'>
              <button  className='px-4 py-2 w-full bg-orange-400 text-white flex justify-center text-center'>Cancel</button>
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