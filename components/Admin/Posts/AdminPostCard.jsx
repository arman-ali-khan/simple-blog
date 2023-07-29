import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-hot-toast';
import { BiSolidCheckCircle } from 'react-icons/bi';

const AdminPostCard = ({post,postUpdate,setPostUpdate}) => {
    // aprove handle
    const handleAprove = (e) =>{
        axios.put(`/api/post/updatepost`,e)
        .then(res=>{
            setPostUpdate(!postUpdate)
            toast.success('Updated')
        })
    }
    // aprove handle
    const handlePending = (e) =>{
        axios.put(`/api/post/updatepost`,e)
        .then(res=>{
            setPostUpdate(!postUpdate)
            toast.success('Updated')
        })
    }
    // delete handle
    const handleDelete = (e) =>{
        axios.delete(`/api/post/delete?id=${post.postId}`)
        .then(res=>{
            setPostUpdate(!postUpdate)
            toast.success('Deleted')
        })
    }

    // handle featured 
    const handleFeatured = (e) =>{
        axios.put(`/api/post/updatepost`,e)
        .then(res=>{
            setPostUpdate(!postUpdate)
        })
    }
    return (
        <div className={`flex flex-row overflow-hidden md:h-32 bg-base-100 sm:h-24  shadow-lg`}>
        <img
          className="block md:w-44 w-28 border-4 flex-none bg-cover md:h-auto h-24 object-cover"
          src={post.featured_image}
        />
        <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full">
          <div className="font-bold  sm:text-base text-sm mb-2 leading-tight">
           <Link className='hover:text-blue-300 visited:text-purple-400 duration-300 text-blue-500' href={`/blog/${post.postId}`}> {post.title}</Link>
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
                   !post.aproved? <button onClick={()=>handleAprove({postId:post.postId,aproved:true})} className='px-3 py-1 border rounded-full flex text-blue-400 items-center gap-2'>Aprove This <BiSolidCheckCircle /></button> 
                   :
                   <button onClick={()=>handlePending({postId:post.postId,aproved:false})} className='px-3 py-1 border rounded-full text-purple-400'>Make Pending</button>
                   }
                </li>
                <li>
                    <button onClick={()=>handleDelete()} className='px-3 py-1 border rounded-full text-error'>Delete</button>
                </li>
                {/* <li>
                    <button className='px-3 py-1 border rounded-full text-warning'>Warning({post?.warn || 0})</button>
                </li> */}
                <li>
                  {post?.featured ?  <button onClick={()=>handleFeatured({postId:post.postId,featured:false})} className='px-3 py-1 border rounded-full text-info'>UnFeature</button>
                    :
                    <button onClick={()=>handleFeatured({postId:post.postId,featured:true})} className='px-3 py-1 border rounded-full text-info'>Featured</button>}
                </li>
            </ul>
          </div>
         </div>
        </div>
      </div>
    );
};

export default AdminPostCard;