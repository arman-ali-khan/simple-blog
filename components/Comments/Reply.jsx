import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../../context/ContextProvider';
import Loader from '../Loader/Loader';

const Reply = ({showReplyBox, setShowReplyBox,comment}) => {
  // reply btn
  const [replyBtn,setReplyBtn] = useState('Reply')
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
     //  react hook form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  //  update reply
  const [update,setUpdate] = useState(false)

  //   reply id
const replyId = uuidv4().split('-')[0]
     // handle reply
  const handleReply = (data) => {
    setReplyBtn(<Loader className='py-4' w={4} h={4} />)
    const reply = {
        ...data,
        replyId,
        commentId:comment.commentId,
        name:dbUser.fullName,
        username:dbUser.username,
        date: Date(),
        email: user.email
    }
    axios.post(`/api/comment/reply/create`,reply)
    .then(res=>{
      reset()
      setReplyBtn('Replied')
      setUpdate(!update)
    })
  };

  // get all replies
  const [replies,setReplies]  = useState([])
  useEffect(()=>{
    axios.get(`/api/comment/reply?id=${comment.commentId}`)
    .then(res=>{
      setReplies(res.data)
    })
  },[comment.commentId,update])

    return (
        <div>
          {
            replies.map(reply=>{
              return (
                <div key={reply._id} className="pl-4 border my-2 py-2">
                <div className="flex items-center gap-2">
                  <Link className="font-bold text-blue-500" href={`#`}>
                   {reply.username}
                  </Link>
                  (<span>{moment(reply?.date).fromNow()}</span>)
                </div>
                <p className="py-1">
                 {reply.reply}
                </p>
                <button
                  onClick={() => setShowReplyBox(!showReplyBox)}
                  className="px-2 py-1 rounded-full border"
                >
                  Reply
                </button>
              </div>
              )
            })
          }
            
            {/* reply box */}
            {showReplyBox ? (
              <form
                onSubmit={handleSubmit(handleReply)}
                className="flex items-center "
              >
                <input
                  {...register("reply", { required: true })}
                  className="w-full h-6 border px-4 py-6 sm:w-96"
                  placeholder="Reply"
                  type="text"
                  id=""
                />
                <button disabled={!dbUser.email} className="px-4 disabled:bg-gray-500 disabled:text-white disabled:py-4 py-3 border">{dbUser?.email ? replyBtn:<Loader className='px-4 py-3' w={4} h={4} />}</button>
              </form>
            ) : (
              ""
            )}
        </div>
    );
};

export default Reply;