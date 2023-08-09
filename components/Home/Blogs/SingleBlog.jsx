import axios from "axios";
import parse from "html-react-parser";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/ContextProvider";
import Layout from "../../../layout/Layout";
import Comments from "../../Comments/Comments";
import Categories from "../Categories/Categories";

const SingleBlog = ({ blog }) => {
  // get context user
  const { dbUser } = useContext(UserContext);

  // get comments
  const [getComments, setGetComments] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_PRO}/api/comments?id=${blog.id}`)
      .then((res) => {
        setGetComments(res.data);
      });
  }, []);
  return (
    <Layout
      title={`${blog.title} || ${"Arman's Blog"}`}
      desc={blog?.description}
      thumb={blog.featured_image}
    >
      <div className="md:flex justify-between">
        <div className=" md:w-4/5 w-full sm:p-0 md:p-1 lg:p-14 bg-base-100">
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
            <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-4xl sm:px-10 sm:mx-12 lg:rounded-md bg-base-200">
              <div className="space-y-2">
                <p className="inline-block text-lg leading-5 font-bold sm:text-2xl md:text-3xl">
                  {blog.title}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <p className="text-sm flex items-center gap-3">
                    By{" "}
                    <Link
                      href={`/user/${blog.username}`}
                      className="text-base text-blue-400 hover:underline"
                    >
                      {dbUser.fullName}
                    </Link>
                    <Link href={"#comments"}>Comment {getComments.count}</Link>
                  </p>

                  <div className="flex items-center text-sm gap-3">
                    <p>{moment(blog.date).fromNow()}</p>
                    View:{" "}
                    <span className="text-teal-500 font-bold">{blog.view}</span>
                  </div>
                </div>
              </div>
              <div className="leading-5">{parse(JSON.parse(blog.body))}</div>
            </div>
          </div>
          {/* Comments */}
          <div>
            <Comments blog={blog} />
          </div>
        </div>
        <div className="md:w-1/5">
          <Categories />
        </div>
      </div>
    </Layout>
  );
};

export default SingleBlog;
