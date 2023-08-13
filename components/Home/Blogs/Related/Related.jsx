import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GiFireBowl } from 'react-icons/gi';
import RelatedCard from './RelatedCard';
const Related = () => {
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
          <div className="bg-base-200 border-b my-2 w-full px-4 py-2 ">
            <h2 className="flex text-base items-center gap-2"><span><GiFireBowl /></span> Related</h2>
          </div>
          <div className="space-y-2 h-auto w-full">
            {loading ? (
              <>
               {
                [...Array(5).keys()].map((item,i)=>{
                return(  <div key={i}
                  className="bg-base-200 w-full flex flex-row overflow-hidden md:h-32  sm:h-24  shadow-lg animate-pulse"
                >
                  <div className="block md:w-44 w-28 bg-base-300 flex-none bg-cover md:h-auto h-24 object-cover animate-pulse"></div>
                  <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full"></div>
                </div>)
                })
               }
              </>
            ) : (
                popular?.map((post) => <RelatedCard key={post.id} post={post} />)
            )}
          </div>
          
         
        </div>
      </div>
    </div>
    );
};

export default Related;