import axios from "axios";
import parse from "html-react-parser";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BiCommentDots } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";
import { MdAlternateEmail } from "react-icons/md";
import { RiFacebookFill, RiPhoneLine, RiTimer2Line } from "react-icons/ri";
import { TbUserEdit } from "react-icons/tb";
import { UserContext } from "../../../context/ContextProvider";
import Layout from "../../../layout/Layout";
import Loader from "../../../lib/Loader";
import Comments from "../../Comments/Comments";
import AboutAuthor from "../../User/AboutAuthor/AboutAuthor";
import Related from "./Related/Related";

const SingleBlog = ({ blog }) => {
  // get context user
  const { dbUser, user,settings } = useContext(UserContext);

  // loading
  const [loading, setLoading] = useState(true);

  // get comments
  const [getComments, setGetComments] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_PRO}/api/comments?id=${blog.id}`)
      .then((res) => {
        setGetComments(res.data);
        setLoading(false);
      });
  }, []);

  // get author
  const [author, setAuthor] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_PRO}/api/allusers?username=${blog?.username}`
      )
      .then((res) => {
        setAuthor(res.data[0]);
      });
  }, [blog]);

  // on hover
  const [hover, setHover] = useState(false);
  return (
    <Layout
      title={`${blog.title} || TrickZone.top`}
      desc={blog?.description}
      thumb={blog.featured_image}
    >
      {loading ? (
        <div className="fixed top-0 left-0 w-screen h-screen z-[999]  backdrop-blur-3xl">
          <Loader />
        </div>
      ) : (
        <div className="md:flex justify-between">
          <div className=" md:w-8/12 2xl:flex 2xl:w-full justify-between 2xl:gap-5 w-full sm:p-0 md:p-1 lg:p-5 bg-base-100">
            <div className="flex flex-col  overflow-hidden rounded">
              {blog.featured_image ? (
                <Image
                  src={blog.featured_image}
                  alt={blog.email}
                  width={700}
                  height={300}
                  className="w-full h-60 object-cover sm:h-96 bg-gray-500"
                />
              ) : (
                <Image
                  src={"https://dummyimage.com/600x480/aaa/aaa"}
                  alt={blog.email}
                  width={700}
                  height={300}
                  className="w-full h-60 object-cover sm:h-96 bg-gray-500"
                />
              )}
              <div className="sm:p-2 border-orange-600 px-2 pb-12 sm:mx-2 rounded-t-lg -mt-16 space-y-6 lg:max-w-4xl sm:px-2 lg:rounded-md bg-base-100 border post-body">
                <div className="space-y-2">
                  <p className="inline-block py-2 text-lg leading-5 font-bold sm:text-2xl md:text-3xl">
                    {blog.title}
                  </p>
                  <div className="flex  sm:flex-row items-center gap-3">
                    <p className="text-sm flex items-center gap-3">
                      <div className="flex items-center gap-2 relative">
                        <TbUserEdit size={20} />
                        <Link
                          onMouseEnter={() => setHover(true)}
                          onMouseLeave={() => setHover(false)}
                          href={`/user/${blog.username}`}
                          className="text-base text-blue-400 hover:underline"
                        >
                          {author.fullName || "Author"}
                        </Link>
                        {/* HOver data */}
                        <div
                          onMouseEnter={() => setHover(true)}
                          onMouseLeave={() => setHover(false)}
                          className={`${
                            hover
                              ? "absolute bg-base-100 rounded-xl border-orange-500 border z-30 flex justify-center h-auto py-3 w-64 top-6"
                              : "hidden"
                          }`}
                        >
                          <div>
                            <div className="flex justify-center mt-2">
                              {/* hover image */}
                              <img
                                className="w-16 h-16 border-white border-2 p-1 object-cover rounded-full"
                                src={
                                  author.photo ||
                                  "https://www.ucae.es/wp-content/uploads/2021/03/dummy-user.jpg"
                                }
                                alt=""
                              />
                            </div>
                            <Link
                              className="text-blue-500 font-bold"
                              href={`/user/${blog.username}`}
                            >
                              <h2>{author.fullName}</h2>
                            </Link>
                            <div className="flex my-3 justify-center">
                              {author.about}
                            </div>
                            {/* Social hover data */}
                            <div className="flex justify-center">
                              <ul className="flex items-center gap-4">
                                {author?.fbId ? (
                                  <li className="border p-2 rounded-full">
                                    <a href={author?.fbId} target="_blank">
                                      <RiFacebookFill size={20} />
                                    </a>
                                  </li>
                                ) : (
                                  ""
                                )}
                                {author?.phone ? (
                                  <li className="border p-2 rounded-full">
                                    <a
                                      href={`tel:${author?.phone}`}
                                      target="_blank"
                                    >
                                      <RiPhoneLine size={20} />
                                    </a>
                                  </li>
                                ) : (
                                  ""
                                )}
                                {author?.email ? (
                                  <li className="border p-2 rounded-full">
                                    <a
                                      href={`mailto:${author?.email}`}
                                      target="_blank"
                                    >
                                      <MdAlternateEmail size={20} />
                                    </a>
                                  </li>
                                ) : (
                                  ""
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link
                        className="flex items-center gap-1"
                        href={"#comments"}
                      >
                        {getComments.count || 0}
                        <BiCommentDots size={20} />{" "}
                      </Link>
                    </p>

                    <div className="flex items-center text-sm gap-3">
                      <p className="flex items-center gap-1">
                        <RiTimer2Line size={20} />
                        <time dateTime={blog.date} suppressHydrationWarning />
                        {moment(blog.date).fromNow()}
                      </p>
                      <HiOutlineEye size={20} />
                      <span className="text-black font-bold">
                        {blog.view}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="postbody overflow-hidden">{parse(JSON.parse(blog.body))}</div>
              </div>
            </div>
                                  {/* Show about user for mobile users */}
            <div className="block md:hidden">
         <AboutAuthor author={author} post={blog} />
         </div>

            {/* Comments */}
            <div className="2xl:w-96">
              <Comments blog={blog} />
            </div>
          </div>
          <div className="md:w-4/12 2xl:w-3/12">
         <div className="hidden md:block">
         <AboutAuthor author={author} post={blog} />
         </div>
            <Related blog={blog} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SingleBlog;
