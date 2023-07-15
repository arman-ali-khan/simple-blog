import { useEffect, useState } from "react";
import Blog from "../Home/Blogs/Blog";
import Categories from "../Home/Categories/Categories";

const CategoryPost = ({blog,loading}) => {
  // error handling
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
    return  mounted && (
        <div className="md:flex justify-between w-full">
              <div className="flex md:w-2/3 w-full  flex-wrap flex-row justify-start">
        
        <div className="md:p-3 p-1 w-full">
        <div className="bg-base-200 w-full px-4 py-2 ">
        <h2>Category Post</h2>
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
            ) :   
              blog?.map(post => <Blog key={post._id} post={post} />)
            }
          </div>
      
       
        </div>
      </div>
      <div className="md:w-1/3 w-full md:p-3 p-1  h-full">
   <Categories />
      </div>
        </div>
    );
};

export default CategoryPost;