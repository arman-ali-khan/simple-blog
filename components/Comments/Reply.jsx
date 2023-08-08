import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../../context/ContextProvider';
import Loader from '../Loader/Loader';

const Reply = ({showReplyBox,blog, setShowReplyBox,comment:comments}) => {
  // reply btn
  const [replyBtn,setReplyBtn] = useState('Reply')
     // get user
     const {user,dbUser} = useContext(UserContext)
     
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
    setReplyBtn(<Loader w={6} h={6} />)
    const comment = {
        ...data,
        replyId,
        postId:blog.postId,
        commentId:comments.commentId,
        type:'reply',
        name:dbUser.fullName,
        username:dbUser.username,
        date: Date(),
        email: user.email
    }
    axios.post(`/api/comment/create`,comment)
    .then(res=>{
      
      reset()
      setReplyBtn('Replied')
      setUpdate(!update)
    })
  };

  // get all replies
  // const [replies,setReplies]  = useState([])
  // useEffect(()=>{
  //   axios.get(`/api/comment/reply?id=${comments.commentId}`)
  //   .then(res=>{
  //     setReplies(res.data)
  //   })
  // },[comments.commentId,update])

    return (
        <div>
            {/* reply box */}
            {/* {showReplyBox ? (
              <form
                onSubmit={handleSubmit(handleReply)}
                className="flex items-center my-2"
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
          {
            replies.map(reply=>{
              return (
                <div key={reply.id} className="pl-4 border-b rounded-full my-2 py-2">
                <div className="flex items-center gap-2">
                  <Link className="font-bold text-blue-500" href={`#`}>
                   {reply.username}
                  </Link>
                  <p className=" relative pt-4 w-full">
                 {reply.reply}
                 <span className='absolute top-3 right-0 text-xs'>{moment(reply.date).fromNow()}</span>
                </p>
                 
                </div>
                
                
              </div> */}
              {/* )
            })
          } */}
            
          
        </div>
    );
};

export default Reply;