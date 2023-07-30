import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PopularCard from './PopularCard';

const Popular = () => {
    // loading
    const [loading,setLoading] = useState(true)

    // get popular data
    const [popular,setPopular] = useState([])
    // fetch data
    useEffect(()=>{
        axios.get(`/api/post/popular`)
        .then(res=>{
            setPopular(res.data)
            setLoading(false)
        })
    },[])
    return (
        <div className="md:flex justify-between w-full">
      <div className="flex w-full  flex-wrap flex-row justify-start">
        <div className=" w-full">
          <div className="bg-base-200 border-b my-2 w-full px-4 py-2 ">
            <h2>Popular</h2>
          </div>
          <div className="space-y-2 h-auto w-full">
            {loading ? (
              <>
               {
                [...Array(5).keys()].map((item,i)=>{
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
                popular?.map((post) => <PopularCard key={post._id} post={post} />)
            )}
          </div>
          
         
        </div>
      </div>
    </div>
    );
};

export default Popular;