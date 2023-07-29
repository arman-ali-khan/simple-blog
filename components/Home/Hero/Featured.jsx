import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

const Featured = () => {
  // featured post
  const [featured,setFeatured] = useState([])
  useEffect(()=>{
    axios.get('/api/post/featured')
    .then(res=>{
      setFeatured(res.data)
    })
  },[])
    return (
       <section className="w-full md:flex justify-between">
        <div className="md:w-2/3  md:p-3 p-1">
          {
            featured.map(post=> <div key={post._id} className="flex flex-row-reverse overflow-hidden md:h-40 bg-base-100 sm:h-24  shadow-lg">
            <img
              className="block md:w-44 w-28 border-4 flex-none bg-cover md:h-auto h-24 object-cover"
              src={post.featured_image}
            />
            <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full">
              <div className="font-bold  sm:text-base text-sm mb-2 leading-tight">
               <Link className='hover:text-blue-300 visited:text-purple-400 duration-300 text-blue-500' href={`/blog/${post.postId}}`}>{post.title}</Link>
              </div>
              <div className="text-sm md:hidden">{post.description.split(' ').slice(0,20).join(' ')}</div>
              <div className="hidden text-sm md:block">{post.description.split(' ').slice(0,40).join(' ')}</div>
             <div>
             <div className='flex justify-between items-center w-full'>
             <p className='hidden sm:block md:hidden lg:block w-full text-xs sm:text-sm md:text-base'>{post.categories && post.categories[0].label}</p>
             <p className='w-full text-xs sm:text-sm md:text-base'>{moment(post.date).fromNow()}</p>
            <span className='w-full text-xs sm:text-sm md:text-base'>View: {post.view}</span>
              </div>
             </div>
            </div>
          </div>)
          }
       
       </div>
       <div className="md:w-1/3 md:p-3 p-1">
        <div className="bg-base-100 flex justify-center items-center md:h-full w-full h-44">
        <p>Ads here</p>
        </div>
       </div>
       </section>
    );
};

export default Featured;