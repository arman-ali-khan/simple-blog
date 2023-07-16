import axios from "axios";
import { useEffect, useState } from "react";
import Categories from "../Categories/Categories";
import Blog from "./Blog";

const Blogs = () => {
  // posts get
  const [getPosts, setGetPosts] = useState({});
  // get post loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/post`).then((res) => {
      setGetPosts(res.data);
      setLoading(false);
    });
  }, []);
  const posts = getPosts?.posts

  // pagination
  const [currentPage,setCurrentPage] = useState(0)
  console.log(currentPage);
  // count
  const count = Math.ceil((getPosts?.count || 10 )/ 2)

  return (
    <div className="md:flex justify-between w-full">
      <div className="flex md:w-2/3 w-full  flex-wrap flex-row justify-start">
        <div className="md:p-3 p-1 w-full">
          <div className="bg-base-200 w-full px-4 py-2 ">
            <h2>Recent</h2>
          </div>
          <div className="space-y-2">
            {loading ? (
             <>
              <div className="bg-base-200 w-full flex flex-row overflow-hidden md:h-32  sm:h-24  shadow-lg animate-pulse">
                <div className="block md:w-44 w-28 bg-black flex-none bg-cover md:h-auto h-24 object-cover animate-pulse"></div>
                <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full"></div>
              </div>
              <div className="bg-base-200 w-full flex flex-row overflow-hidden md:h-32  sm:h-24  shadow-lg animate-pulse">
                <div className="block md:w-44 w-28 bg-black flex-none bg-cover md:h-auto h-24 object-cover animate-pulse"></div>
                <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full"></div>
              </div>
              <div className="bg-base-200 w-full flex flex-row overflow-hidden md:h-32  sm:h-24  shadow-lg animate-pulse">
                <div className="block md:w-44 w-28 bg-black flex-none bg-cover md:h-auto h-24 object-cover animate-pulse"></div>
                <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full"></div>
              </div>
              
             </>
            ) : (
              posts?.map((post) => <Blog key={post._id} post={post} />)
            )}
          </div>
          <div className="flex justify-center my-3 space-x-1 ">
            {/* Decrease */}
          <button
          disabled={currentPage===0}
           onClick={()=>setCurrentPage(currentPage-1)}
              title="previous"
              type="button"
              className="inline-flex disabled:bg-gray-100 items-center justify-center w-8 h-8 py-0 border hover:bg-purple-400 disabled:hover:bg-gray-300 hover:text-black duration-300 rounded-md shadow-md"
            >
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          {
          [...Array(count).keys()].map((item,i)=>
          <button key={i}
          onClick={()=>setCurrentPage(item)}
              type="button"
              title="Page 1"
              className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border hover:bg- hover:text-black duration-300 rounded shadow-md bg- text-violet-600 border-violet-600 ${item===currentPage && 'bg-info'}`}
            >
              {item+1}
            </button>
            )
  }
           {/* Increase */}
            <button
            onClick={()=>setCurrentPage(parseInt(currentPage)+1)}
              title="next"
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 py-0 border hover:bg-purple-400 hover:text-black duration-300 rounded-md shadow-md"
            >
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="md:w-1/3 w-full md:p-3 p-1  h-full">
        <Categories />
      </div>
    </div>
  );
};

export default Blogs;
