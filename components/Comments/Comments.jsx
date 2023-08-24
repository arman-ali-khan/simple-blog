import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/ContextProvider";
import Comment from "./Comment";

const Comments = ({ blog }) => {
  // comment btn
  const [commentBtn, setCommentBtn] = useState("Comment");
  // get user
  const { user,dbUser,logOut } = useContext(UserContext);
 
// router
const router = useRouter()

  //  update comment
  const [update, setUpdate] = useState(false);

  //  react hook form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // handle comment
  const handleComment = (data) => {
    setCommentBtn('Loading...');
    const comment = {
      comment: data.comment,
      postId: blog.id,
      email: user.email,
      name: dbUser.fullName,
      username: dbUser.username,
      author: blog.email,
      type: "comment",
      date: Date(),
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API_PRO}/api/comments`, comment,{
        headers:{
          authorization: `Basic ${Cookies.get('token')}`,
          email: user.email
        }
      })
      .then((res) => {
        toast.success("Commented");
        reset();
        setUpdate(!update);
        setCommentBtn("Comment");
      })
      .catch(err=>{
        setCommentBtn("Try again");
        if(err?.response?.status===401){
          logOut().then(() => {
            router.push(`/start/login`)
          })
        }
      })
  };
  // current page
  const [currentPage, setCurrentPage] = useState(1);
  // get comments
  const [getComments, setGetComments] = useState({});

  //  loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
 
    if (blog.id) {
      setLoading(true);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_PRO}/api/comments?id=${blog.id}&limit=10&page=${currentPage}`
        )
        .then((res) => {
          setGetComments(res.data);
          if(res.data){
            setLoading(false);
          }
        });
    }
  }, [  update, currentPage]);
  /// comments
  const comments = getComments.comments;

  const count = Math.ceil((getComments?.count || 10) / 10);
  return (
    <div id="comments">
      
      {/* Comment List */}
      <div className="border">
        <div className="px-4 py-3 2xl:w-96 w-full bg-blue-400 text-white font-bold text-xl">
          <h2>Comments({getComments?.count || 0})</h2>
        </div>
        {/* Comment box */}
      <div className="flex my-2 justify-center w-full">
        {user?.email ? (
          <form
            onSubmit={handleSubmit(handleComment)}
            className="flex w-full  2xl:w-96 sm:w-auto"
          >
            <div className="w-full">
              <textarea
                {...register("comment", { required: true })}
                className="sm:w-96  2xl:w-64 w-full h-12
              border px-4 py-2"
                placeholder="Comment"
              ></textarea>
            </div>
            <div className="">
              <button
                disabled={!dbUser.email}
                className="px-4 disabled:bg-gray-500 py-[11px] bg-base-200 border"
              >
                {" "}
                {commentBtn}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <Link
              className="text-blue-500 font-bold"
              href={`/start/login?to=${blog.id}`}
            >
              Login
            </Link>{" "}
            to Comment{" "}
          </div>
        )}
      </div>
        {loading
          ? [...Array(getComments?.count).keys()].map((item, i) => {
              return (
                <div key={i} className="w-full flex items-center  border py-4">
                  <div className="w-32 mx-4 animate-pulse bg-base-300 h-6"></div>
                  <div className="w-full mx-4 animate-pulse bg-base-300 h-6"></div>
                </div>
              );
            })
          : comments?.map((comment, i) => (
              <Comment
                update={update}
                setUpdate={setUpdate}
                blog={blog}
                comment={comment}
                key={i}
              />
            ))}
      </div>
      {/* pagination */}
      { getComments?.count > 10 &&
        <div className="flex justify-center my-3 space-x-1 ">
          {[...Array(count).keys()].map((item, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(item + 1)}
              type="button"
              title="Page 1"
              className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border hover:bg-blue-500  hover:text-base-200 duration-300 rounded shadow-md  border-blue-600 ${
                item + 1 === currentPage
                  ? "bg-blue-500 text-black"
                  : "bg-base-200"
              }`}
            >
              {item + 1}
            </button>
          ))}
        </div>
      }
    </div>
  );
};

export default Comments;
