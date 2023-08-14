import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsBookmarks } from "react-icons/bs";

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
        <div className="bg-base-200 w-full border-b my-2 px-4 py-2 flex items-center gap-2">
          <BsBookmarks /> <h2 className="text-base">Featured</h2>
        </div>
        {loading ? (
          <div className="bg-base-200 w-full flex flex-row-reverse overflow-hidden  shadow-lg animate-pulse">
            <div className="block md:w-44 w-28 bg-base-300 flex-none bg-cover md:h-44 h-24 object-cover animate-pulse"></div>
            <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full"></div>
          </div>
        ) : (
          featured.map((post) => (
            <div
              key={post.id}
              className={`flex border-b  flex-row-reverse overflow-hidden md:h-40 pb-2 bg-base-100 sm:h-24  shadow-lg ${
                post.featured === 0 && "hidden"
              }`}
            >
              <Image
                className="block md:w-44 w-28 border-4 flex-none bg-cover md:h-auto h-24 object-cover"
                src={post.featured_image}
                width={176}
                height={96}
                alt={post.email}
              />
              <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full">
                <div className="font-bold  sm:text-base text-sm mb-2 leading-tight">
                  <Link
                    className="hover:text-blue-300 visited:text-purple-400 duration-300 text-blue-500"
                    href={`/blog/${post.id}`}
                  >
                    {post.title}
                  </Link>
                </div>
                <div className="text-sm md:hidden">
                  {post.description.split(" ").slice(0, 20).join(" ")}
                </div>
                <div className="hidden text-sm md:block">
                  {post.description.split(" ").slice(0, 30).join(" ")}
                </div>
                <div>
                  <div className="flex justify-between items-center w-full">
                    <Link
                      href={`/category/${
                        JSON.parse(post?.categories)[0].value
                      }`}
                      className="hidden text-blue-400 sm:block md:hidden lg:block w-full text-xs sm:text-sm md:text-base truncate"
                    >
                      {JSON.parse(post?.categories) &&
                        JSON.parse(post.categories)[0].label}
                    </Link>
                    <p className="w-full text-xs sm:text-sm md:text-base">
                      {moment(post.date).fromNow()}
                    </p>
                    <span className="w-full text-xs sm:text-sm md:text-base">
                      View: {post.view}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="md:w-1/3 md:p-3 p-1">
        <div className="bg-base-100 border relative flex justify-center items-center  h-56">
          <p className="absolute right-0 top-0 text-xs px-1 bg-base-300">Ads </p>
          <img src="https://dummyimage.com/600x224/aaa/aaa" className="h-full w-full object-cover" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Featured;
