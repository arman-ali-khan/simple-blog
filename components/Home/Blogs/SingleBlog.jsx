import axios from "axios";
import parse from "html-react-parser";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BiCommentDots } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";
import { RiTimer2Line } from "react-icons/ri";
import { TbUserEdit } from "react-icons/tb";
import { UserContext } from "../../../context/ContextProvider";
import Layout from "../../../layout/Layout";
import Comments from "../../Comments/Comments";
import AboutAuthor from "../../User/AboutAuthor/AboutAuthor";
import Related from "./Related/Related";

const SingleBlog = ({ blog }) => {
  // get context user
  const { dbUser,user } = useContext(UserContext);

  // get comments
  const [getComments, setGetComments] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_PRO}/api/comments?id=${blog.id}`)
      .then((res) => {
        setGetComments(res.data);
      });
  }, []);

  // get author 
  const [author,setAuthor] = useState({})
  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/allusers?username=${blog?.username}`)
    .then(res=>{
      setAuthor(res.data[0])
    })
  },[blog])
  return (
    <Layout
      title={`${blog.title} || ${"Arman's Blog"}`}
      desc={blog?.description}
      thumb={blog.featured_image}
    >
      <div className="md:flex justify-between">
        <div className=" md:w-4/5 w-full sm:p-0 md:p-1 lg:p-5 bg-base-100">
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
            <div className="sm:p-2 px-2 pb-12 sm:mx-2 rounded-t-lg -mt-16 space-y-6 lg:max-w-4xl sm:px-2 lg:rounded-md bg-base-100 border post-body">
              <div className="space-y-2">
                <p className="inline-block py-2 text-lg leading-5 font-bold sm:text-2xl md:text-3xl">
                  {blog.title}
                </p>
                <div className="flex  sm:flex-row items-center gap-3">
                  <p className="text-sm flex items-center gap-3">
                   <TbUserEdit size={20} />
                    <Link
                      href={`/user/${blog.username}`}
                      className="text-base text-blue-400 hover:underline"
                    >
                      {author.fullName || 'Author'}
                    </Link>
                    <Link className="flex items-center gap-1" href={"#comments"}>{getComments.count || 0}<BiCommentDots size={20} /> </Link>
                  </p>

                  <div className="flex items-center text-sm gap-3">
                    <p className="flex items-center gap-1"><RiTimer2Line size={20} />{moment(blog.date).fromNow()}</p>
                    <HiOutlineEye size={20} />
                    <span className="text-teal-500 font-bold">{blog.view}</span>
                  </div>
                </div>
              </div>
              <div>{parse(JSON.parse(blog.body))}</div>
            </div>
          </div>
          {/* Comments */}
          <div>
            <Comments blog={blog} />
          </div>
        </div>
        <div className="md:w-1/4">
         <AboutAuthor author={author} post={blog} />
              <Related blog={blog} />
        </div>
      </div>
    </Layout>
  );
};

export default SingleBlog;
