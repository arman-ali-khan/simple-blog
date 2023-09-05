import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
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
const view = JSON.stringify(post?.view)

  return (
    <div
      className={`flex  flex-row p-1 overflow-hidden border-b my-1 md:h-32 bg-base-100 sm:h-24  shadow-lg`}
    >
      <Image
        className="block md:w-32 w-16 sm:w-24 border-2 md:border-4 border-blue-400 flex-none bg-cover md:h-auto h-16 sm:h-24 object-cover"
        src={post?.featured_image}
        width={200}
        height={200}
        alt={post.email}
      />
      <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full">
        <div className="font-bold  sm:text-base text-sm mb-2 leading-tight">
          <Link
            className="hover:text-blue-300 visited:text-purple-400 duration-300 text-blue-500"
            href={`/blog/${post?.id}/${post.title.split(/[\s?=":/',]+/).join('-').toLowerCase()}`}
          >
            {post?.title}
          </Link>
        </div>
        <div>
          <div className="flex justify-between gap-2 items-center w-full">
          <Link href={`/category/${categories[0].value}`} className=' text-blue-400  lg:block w-full text-xs sm:text-sm md:text-base truncate'>{categories && categories[0].label}</Link>
            <Link href={`/blog/${post.id}#comments`} className="w-full truncate flex items-center gap-2 text-xs sm:text-sm md:text-base">
            <span className="w-5"> <BiCommentDots size={20} /></span> {count.count > 1000 ? `${count.count}k+` : (count.count || 0)}
            </Link>
            <p className="w-full text-xs sm:text-sm md:text-base truncate flex items-center gap-1 ">
           <span className="w-5"> <AiOutlineFieldTime size={20} /></span> <span className="w-full">{moment(post?.createdAt).fromNow().split(' ').slice(0,2).join(' ')}</span>
            </p>
            <span className="w-full text-xs sm:text-sm md:text-base flex items-center gap-2">
              <VscEye size={24} />{post.view > 1000 ? view?.split('').slice(0,1).join('') +`k+`:post.view}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
