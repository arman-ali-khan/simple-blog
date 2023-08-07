import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../../context/ContextProvider";
import Loader from "../Loader/Loader";
import Comment from "./Comment";


const Comments = ({blog}) => {
  // comment btn
  const [commentBtn,setCommentBtn] = useState('Comment')
    // get user
    const {user} = useContext(UserContext)
    //  get db user
    const [dbUser,setDbUser] = useState({})
    useEffect(()=>{
       if(user?.email){
        axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/users?email=${user?.email}`)
        .then(res=>{
            setDbUser(res.data)
        })
       }
    },[user?.email])

//   comment id
const commentId = uuidv4().split('-')[0]

//  send notification

//  update comment
const [update,setUpdate] = useState(false)

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
    setCommentBtn(<Loader w={4} h={4}/>)
   const comment = {
    comment:data.comment,
    postId:blog.id,
    email:user.email,
    name:dbUser.fullName,
    username: dbUser.username,
    author:blog.email,
    type:'comment',
    date: Date()
   }
   axios.post(`${process.env.NEXT_PUBLIC_API_PRO}/api/comments`,comment)
   .then(res=>{
    console.log(res.data)
    toast.success('Commented')
    reset()
    setUpdate(!update)
    setCommentBtn('Commented')
   })
  };
  // current page
  const [currentPage, setCurrentPage] = useState(1);
  // get comments
  const [getComments,setGetComments] = useState({})

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/comments?id=${blog.id}&limit=10&page=${currentPage}`)
    .then(res=>{
        setGetComments(res.data)
    })
  },[update,currentPage])
  /// comments
  const comments = getComments.comments


  const count = Math.ceil((getComments?.count || 10 )/ 10)
  return (
    <div className="">
      <div className="flex justify-center w-full">
       {
        user?.email ?  <form
        onSubmit={handleSubmit(handleComment)}
        className="flex w-full sm:w-auto"
      >
        <div className="w-full">
          <textarea
            {...register("comment", { required: true })}
            className="sm:w-96 w-full md:h-24 h-14
              border px-4 py-2"
            placeholder="Comment"
          ></textarea>
        </div>
        <div className="">
          <button disabled={!dbUser.email} className="px-4 disabled:bg-gray-500 py-2 bg-base-200 border"> {commentBtn}</button>
        </div>
      </form>
      :
      <div><Link className="text-blue-500 font-bold" href={`/start/login?to=${blog.postId}`}>Login</Link> to Comment </div>
       }
      </div>
      {/* Comment List */}
      <div className="border">
        <div className="px-4 py-3  w-full bg-blue-400 text-white font-bold text-xl">
          <h2>Comments({getComments?.count || 0})</h2>
        </div>
       {
        comments?.map((comment,i)=><Comment blog={blog} comment={comment} key={i} />        )
       }
      </div>
       {/* pagination */}
       {
             <div className="flex justify-center my-3 space-x-1 ">
         
            {[...Array(count).keys()].map((item, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(item+1)}
                type="button"
                title="Page 1"
                className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border hover:bg-blue-500  hover:text-base-200 duration-300 rounded shadow-md  border-blue-600 ${
                  item+1 === currentPage? "bg-blue-500 text-black":"bg-base-200"
                }`}
              >
                {item+1}
              </button>
            ))}
          </div>
          }
    </div>
  );
};

export default Comments;
