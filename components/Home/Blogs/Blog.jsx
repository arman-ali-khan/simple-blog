import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiCommentDots } from "react-icons/bi";
import { VscEye } from 'react-icons/vsc';

const Blog = ({ post }) => {
  const categories = JSON.parse(post?.categories);
  // get comment count 
const [count,setCount] = useState('')
useEffect(()=>{
  axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/comments?id=${post.id}`)
  .then(res=>{
    setCount(res.data)
  })
},[])
  return (
    <div
      className={`flex ${
       ( post?.aproved === 0 || post?.publish === 0) && "hidden"
      } flex-row overflow-hidden border-b my-1 md:h-32 bg-base-100 sm:h-24  shadow-lg`}
    >
      <Image
        className="block md:w-44 w-28 border-4 border-gray-500 flex-none bg-cover md:h-auto h-24 object-cover"
        src={post?.featured_image}
        width={112}
        height={96}
        alt={post.username}
      />
      <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full">
        <div className="font-bold  sm:text-base text-sm mb-2 leading-tight">
          <Link
            className="hover:text-blue-300 visited:text-purple-400 duration-300 text-blue-500"
            href={`/blog/${post?.id}`}
          >
            {" "}
            {post?.title}
          </Link>
        </div>
        <div>
          <div className="flex justify-between items-center w-full">
            <p className="hidden md:hidden lg:block w-full text-xs sm:text-sm md:text-base truncate sm:flex items-center">
           {categories && categories[0].label}
            </p>
            <p className="w-full flex items-center gap-2 text-xs sm:text-sm md:text-base">
             <BiCommentDots size={20} /> {count.count}
            </p>
            <p className="w-full text-xs sm:text-sm md:text-base flex items-center gap-2">
             {moment(post?.date).fromNow()}
            </p>
            <span className="w-full text-xs sm:text-sm md:text-base flex items-center gap-2">
              <VscEye size={24} />{post?.view}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
