import axios from "axios";
import parse from "html-react-parser";
const moment = require('moment');

import { useEffect, useState } from "react";
import { BiBookContent } from "react-icons/bi";
import { CiLink } from "react-icons/ci";
function Hadith() {
  const likes = typeof window!=='undefined' && localStorage.getItem('likes')
  moment.locale('bn');
  const [getPosts, setGetPosts] = useState({});
  // get post loading
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [count,setCount] = useState(null)
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setLoadingBlog(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_PRO}/api/hadith?page=${currentPage}&limit=1`)
      .then((res) => {
        setGetPosts(res.data?.hadith);
        setCount(res.data?.count)
        setLoadingBlog(false);
      });
  }, [currentPage]);
  
  // const [local,setLocal] = useState(false) 
  // useEffect(()=>{
  //   setLocal(!local)
  // },[local])

     // handle get likes form local storage
     const [added, setAdded] = useState(null);
     

  useEffect(() => {
    const like = typeof window !== "undefined" && localStorage.getItem("like");
    if (like === 'true') {
      setAdded(true);
    }else{
      setAdded(false)
    }
    console.log(like,'like')
  }, []);

    // const count = Math.ceil((getPosts?.count || 1 )/ 10)


   
  // handle like hadith
  const handleLike = (id) => {
   
    console.log(id);
    if(likes){
      typeof window!=='undefined' && localStorage.setItem('likes',[...likes,id])
    }else{
      typeof window!=='undefined' && localStorage.setItem('likes',[id])
    }
  };
  
  const [showFull,setShowFull] = useState(false)
  return (
    <div className=" container mx-auto md:flex justify-between px-1 md:px-4">
      <div className="flex w-full  flex-wrap flex-row justify-start">
        {loadingBlog ? (
          <div className="flex flex-col space-y-2">
            <div className="py-2 h-12 min-w-44 w-full max-w-full flex rounded-md bg-base-300 skeleton"></div>
            <div className="py-2 h-44 min-w-44 w-full max-w-full flex rounded-md bg-base-300 skeleton"></div>
            <div className="py-2 h-14 border border-orange-400 rounded-full max-w-96 min-w-72 w-full bg-base-300 skeleton"></div>
          </div>
        ) : (
          getPosts?.length &&
          getPosts?.map((hadith, i) => {
            return (
              <div className=" w-full">
                <div className="border-orange-500 bg-orange-400 w-full border-b my-2 md:px-4 py-1 flex items-center gap-2 text-white font-bold">
                  <h2 className="flex text-base items-center gap-1 md:gap-2">
                    <span>
                      <BiBookContent size={20} />
                    </span>{" "}
                    Daily Hadith
                  </h2>
                </div>
               
                <div style={{overflow:showFull?'':'hidden',height:showFull?'auto':'176px'}} className="space-y-2 w-full">
                  {parse(hadith?.content)}
                 
                </div>
                <div className="max-w-96 text-sm md:text-base min-w-fit w-full items-center rounded-full border border-orange-300 px-1 md:px-4 md:py-2 flex justify-between">
                  {/* Prev */}
                  <button disabled={currentPage===1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="btn btn-sm rounded-full"
                  >
                    নতুন
                  </button>
                  {/* Like */}
                  {/* <button
                    onClick={() => handleLike(hadith?.id)}
                    style={{ color: added ? "red" : "" }}
                    className="btn rounded-full btn-sm"
                  >
                    Like{added ? "d" : ""}
                    <BsHeartPulseFill fill={added ? "red" : ""} />
                  </button> */}
                  <button className="btn btn-sm rounded-full" onClick={()=>setShowFull(!showFull)}>{showFull ? 'Hide':'More'}</button>
                  <a target="_blank" className="px-4 py-2 rounded-full btn btn-sm" href={hadith?.source}> <CiLink /> সোর্স</a>
                  {/* <p className="text-xs">{moment(hadith?.createdAt).fromNow()}</p> */}
                  {/* Next */}
                  <button disabled={count == currentPage}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="btn btn-sm rounded-full"
                  >
                    পুরাতন
                  </button>
                
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Hadith;
