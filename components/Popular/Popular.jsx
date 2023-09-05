import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GiFireBowl } from 'react-icons/gi';
import PopularCard from './PopularCard';
const Popular = () => {
    // loading
    const [loading,setLoading] = useState(true)

    // get popular data
    const [popular,setPopular] = useState([])
    // fetch data
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/popular`)
        .then(res=>{
            setPopular(res.data)
            setLoading(false)
        })
    },[])
    return (
        <div className="md:flex justify-between w-full">
      <div className="flex w-full  flex-wrap flex-row justify-start">
        <div className=" w-full">
          <div className="border-orange-500 bg-orange-400 w-full border-b my-2 px-4 py-1 flex items-center gap-2 text-white font-bold">
            <h2 className="flex text-base items-center gap-2"><span><GiFireBowl size={20} /></span> Popular</h2>
          </div>
          <div className="space-y-2 h-auto w-full">
            {loading ? (
              <>
               {
                [...Array(5).keys()].map((item,i)=>{
                return(  <div key={i}
                  className="bg-base-200 w-full flex flex-row overflow-hidden md:h-32  sm:h-24  shadow-lg animate-pulse"
                >
                  <div className="block md:w-32 w-16 sm:w-24 border-2 bg-base-300 flex-none bg-cover md:h-auto h-16 sm:h-24 object-cover animate-pulse"></div>
                  <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full"></div>
                </div>)
                })
               }
              </>
            ) : (
                popular?.map((post) => <PopularCard key={post.id} post={post} />)
            )}
          </div>
          
         
        </div>
      </div>
    </div>
    );
};

export default Popular;