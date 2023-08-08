import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BsViewList } from 'react-icons/bs';
import { UserContext } from "../../../context/ContextProvider";
import Popular from "../../Popular/Popular";
import Notifications from "../../User/Sidebar/Notifications";
import UserAnalytics from "../../User/Sidebar/UserAnalytics";
import Categories from "../Categories/Categories";
import Blog from "./Blog";

const Blogs = () => {
  // get user
  const {user} = useContext(UserContext)
  // posts get
  const [getPosts, setGetPosts] = useState({});
  // get post loading
  const [loading, setLoading] = useState(true);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/posts?limit=10&page=${currentPage}`).then((res) => {
      setGetPosts(res.data);
      setLoading(false);
    });
  }, [currentPage]);
  const posts = getPosts?.posts;

  // count
  const count = Math.ceil((getPosts?.count || 10 )/ 10)

  return (
    <div className="md:flex justify-between w-full">
      <div className="flex md:w-2/3 w-full  flex-wrap flex-row justify-start">
        
        <div className="md:p-3 p-1 w-full">
          {/* popular */}
        <div className="w-full my-4">
        <Popular />
        </div>
          <div className="bg-base-300 w-full border-b my-2 px-4 py-2 flex items-center gap-2">
          <BsViewList />  <h2>Recent</h2>
          </div>
          <div className="space-y-2">
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
              posts?.map((post) => <Blog key={post.id} post={post} />)
            )}

            {/* pagination */}
          {
             <div className="flex justify-center my-3 space-x-1 ">
         
            {[...Array(count).keys()].map((item, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(item+1)}
                type="button"
                title="Page 1"
                className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border hover:bg-blue-500  hover:text-base-200 duration-300 rounded shadow-md  border-blue-600 ${
                  item+1 === currentPage? "bg-blue-500 text-black":"bg-base-200"
                }`}
              >
                {item+1}
              </button>
            ))}
          </div>
          }
          </div>
          
         
        </div>
      </div>
      <div className="md:w-1/3 w-full md:p-3 p-1  h-full">
       
        {
          user?.email ? 
          <div>
            <UserAnalytics />
            <Notifications />
          </div>
          :
          <Categories />
        }
      </div>
    </div>
  );
};

export default Blogs;
