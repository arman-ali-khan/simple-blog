import axios from "axios";
import { useEffect, useState } from "react";
import { BsBookmarks } from "react-icons/bs";
import SingleFeatured from "./SingleFeatured";

const Featured = () => {
  // loading
  const [loading, setLoading] = useState(true);
  // featured post
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/featured`).then((res) => {
      setFeatured(res.data);
      setLoading(false);
    });
  }, []);



  return (
    <section className="w-full md:flex justify-between">
      <div className="md:w-2/3  md:p-3 p-1">
        <div className="border-orange-500 bg-orange-400 w-full border-b my-2 px-4 py-1 flex items-center gap-2 text-white font-bold">
          <BsBookmarks /> <h2 className="text-base">Featured</h2>
        </div>
        {loading ? (
          <div className="bg-base-200 w-full flex flex-row-reverse overflow-hidden  shadow-lg animate-pulse">
            <div className="block md:w-44 w-28 bg-base-300 flex-none bg-cover md:h-44 h-24 object-cover animate-pulse"></div>
            <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full"></div>
          </div>
        ) : (
          featured.map((post) => <SingleFeatured post={post} key={post.id} />)
        )}
      </div>
      {/* <div className="md:w-1/3 md:p-3 p-1">
        <div className="bg-base-100 border animate-pulse relative flex justify-center items-center  h-56">
          <p className="absolute right-0 top-0 text-xs px-1 bg-base-300">Ads </p>
          <img src="https://dummyimage.com/600x224/aaa/aaa" className="h-full w-full object-cover" alt="" />
        </div>
      </div> */}
    </section>
  );
};

export default Featured;
