import Link from 'next/link';
import React, { useState } from 'react';

const UserPostCard = ({post}) => {
  // postId
  const [editId,setEditId] = useState('')
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
       <Link href={`/blog/${post.postId}`}> {post.title}<span className='border p-1 ml-2 text-info rounded-full py-0'>{post?.publish?'':'Darft'}</span></Link>
      </div>
      <div className="flex gap-3">
        <Link href={`/update/${post.postId}`} className="px-2 py-1 text-blue-400" onClick={()=>setEditId(post?.postId)}>Edit</Link>
        <button className={`px-2 py-1 ${post?.publish?'text-warning':'text-success'}`}>{post?.publish ?'Unpublish':'Publish'}</button>
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