import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../../context/ContextProvider";
import Comment from "./Comment";


const Comments = ({blog}) => {
    // get user
    const {user} = useContext(UserContext)
    //  get db user
    const [dbUser,setDbUser] = useState({})
    useEffect(()=>{
       if(user?.email){
        axios.get(`/api/user?email=${user.email}`)
        .then(res=>{
            setDbUser(res.data)
        })
       }
    },[user?.email])

//   comment id
const commentId = uuidv4().split('-')[0]

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
   const comment = {
    ...data,
    postId:blog.postId,
    email:user.email,
    name:dbUser.fullName,
    username: dbUser.username,
    commentId,
    date: Date()
   }
   axios.post(`/api/comment/create`,comment)
   .then(res=>{
    console.log(res.data)
    toast.success('Commented')
    reset()
   })
  };

  // get comments
  const [getComments,setGetComments] = useState({})

  useEffect(()=>{
    axios.get(`/api/comment?id=${blog.postId}&page=0`)
    .then(res=>{
        setGetComments(res.data)
    })
  },[])
  /// comments
  const comments = getComments.posts
  return (
    <div className="">
      <div className="flex justify-center w-full">
        <form
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
            <button className="px-4 py-2 bg-base-200 border">Comment</button>
          </div>
        </form>
      </div>
      {/* Comment List */}
      <div>
        <div className="px-4 py-3  w-full bg-base-200 border font-bold text-xl">
          <h2>Comments({comments?.length || 0})</h2>
        </div>
       {
        comments?.map((comment,i)=><Comment comment={comment} key={i} />        )
       }
      </div>
    </div>
  );
};

export default Comments;
