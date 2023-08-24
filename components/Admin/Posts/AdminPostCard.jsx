import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiSolidCheckCircle } from 'react-icons/bi';
import { UserContext } from '../../../context/ContextProvider';

const AdminPostCard = ({post,postUpdate,setPostUpdate}) => {
  // loading
  const [loading,setLoading] = useState(false)
    // user
    const {user } = useContext(UserContext)
    // aprove handle
    const handleAprove = (e) =>{
      setLoading(true)
        axios.put(`${process.env.NEXT_PUBLIC_API_PRO}/api/admin/posts/${post.id}`,{...e,postEmail:post?.email})
        .then(res=>{
            setPostUpdate(!postUpdate)
            toast.success('Updated')
            setLoading(false)
        })
    }
    // aprove handle
    const handlePending = (e) =>{
      setLoading(true)
        axios.put(`${process.env.NEXT_PUBLIC_API_PRO}/api/admin/posts/${post.id}`,{...e,postEmail:post?.email})
        .then(res=>{
            setPostUpdate(!postUpdate)
            toast.success('Updated')
            setLoading(false)
        })
    }
    // delete handle
    const handleDelete = (e) =>{
        axios.delete(`${process.env.NEXT_PUBLIC_API_PRO}/api/posts/${post.id}`,{
            headers:{
              authorization: `Basic ${Cookies.get('token')}`,
              email : user?.email
            }
          })
        .then(res=>{
            setPostUpdate(!postUpdate)
            toast.success('Deleted')
        })  .catch(err=>{
            if(err?.response?.status===401){
              logOut().then(() => {
                router.push(`/start/login`)
              })
            }
          })
    }

    // handle featured 
    const handleFeatured = (e) =>{
        axios.put(`${process.env.NEXT_PUBLIC_API_PRO}/api/post/updatepost`,e)
        .then(res=>{
            setPostUpdate(!postUpdate)
        })
    }

    
    return (
        <div className={`flex ${post.featured===1 && 'bg-teal-100'} flex-row overflow-hidden md:h-32 bg-base-100 sm:h-24  shadow-lg`}>
        <img
          className="block md:w-44 w-28 border-4 flex-none bg-cover md:h-auto h-24 object-cover"
          src={post.featured_image}
        />
        <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full">
          <div className="font-bold  sm:text-base text-sm mb-2 leading-tight">
           <Link className='hover:text-blue-300 visited:text-purple-400 duration-300 text-blue-500' href={`/blog/${post.id}`}> {post.title}</Link>
          </div>
         <div>
         <div className='flex justify-between items-center w-full'>
            <p className='hidden sm:block md:hidden lg:block w-full text-xs sm:text-sm md:text-base'>{post.categories && post.categories[0].label}</p>
            <p className='w-full text-xs sm:text-sm md:text-base'>{moment(post.date).fromNow()}</p>
            <span className='w-full text-xs sm:text-sm md:text-base'>View: {post.view}</span>
          </div>
          <div className='my-2'>
            <ul className='flex justify-between  items-center'>
                <li>
                   {
                   post.aproved===0? <button onClick={()=>handleAprove({aproved:1})} className='px-3 py-1 border rounded-full  text-blue-400'>{loading ?'Loading...':'Pending'}</button> 
                   :
                   <button onClick={()=>handlePending({aproved:0})} className='px-3 py-1 border rounded-full flex items-center  gap-2 text-purple-400'>{loading ? 'Loading...':<>'Aproved' <BiSolidCheckCircle /></>}</button>
                   }
                </li>
                <li>
                    <button onClick={()=>handleDelete()} className='px-3 py-1 border rounded-full text-error'>Delete</button>
                </li>
                {/* <li>
                    <button className='px-3 py-1 border rounded-full text-warning'>Warning({post?.warn || 0})</button>
                </li> */}
                <li>
                  {post?.featured!==0 ?  <button onClick={()=>handleFeatured({id:post.id,featured:0})} className='px-3 py-1 border rounded-full text-info'>Featured</button>
                    :
                    <button onClick={()=>handleFeatured({id:post.id,featured:1})} className='px-3 py-1 border rounded-full text-info'>Add Featured</button>}
                </li>
            </ul>
          </div>
         </div>
        </div>
      </div>
    );
};

export default AdminPostCard;