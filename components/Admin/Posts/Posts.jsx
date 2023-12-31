import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminPostCard from './AdminPostCard';

const Posts = () => {
      // posts get
  const [getPosts, setGetPosts] = useState({});


  // update post
  const [postUpdate,setPostUpdate] = useState(false)
  // get post loading
  const [loading, setLoading] = useState(true);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/admin/allposts?limit=10&page=${currentPage}`).then((res) => {
      setGetPosts(res.data);
      setLoading(false);
    });
  }, [currentPage,postUpdate]);
  const posts = getPosts?.posts;

  // count
  const count = Math.ceil((getPosts?.count || 10) / 10);
    return (
             <div className="md:p-3 p-1 w-full">
          <div className="bg-base-200 w-full px-4 py-2 ">
            <h2>Recent</h2>
          </div>
          <div className="space-y-2 w-full">
            {loading ? (
              <>
               {
                [...Array(10).keys()].map((item,i)=>{
                return(  <div key={i}
                  className="bg-base-200 w-full flex flex-row overflow-hidden md:h-32  sm:h-24  shadow-lg animate-pulse"
                >
                  <div className="block md:w-44 w-28 bg-black flex-none bg-cover md:h-auto h-24 object-cover animate-pulse"></div>
                  <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full"></div>
                </div>)
                })
               }
              </>
            ) : (
              posts?.map((post) => <AdminPostCard postUpdate={postUpdate} setPostUpdate={setPostUpdate} key={post.id} post={post} />)
            )}
          </div>
          <div className="flex justify-center my-3 space-x-1 ">
        
            {[...Array(count).keys()].map((item, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(item+1)}
                type="button"
                title="Page 1"
                className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border hover:bg- hover:text-black duration-300 rounded shadow-md bg- text-violet-600 border-violet-600 ${
                  item+1 === currentPage && "bg-info"
                }`}
              >
                {item + 1}
              </button>
            ))}
           
          </div>
        </div>
    );
};

export default Posts;