import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/ContextProvider';
import Reply from './Reply';

const Comment = ({comment,blog,update,setUpdate}) => {
  
    // context
    const {user} = useContext(UserContext)
  // 
    const [showReplyBox, setShowReplyBox] = useState(false);

    // delete comment
    const handleDeleteComment = id =>{
      axios.delete(`${process.env.NEXT_PUBLIC_API_PRO}/api/comments/${id}`)
      .then(res=>{
        console.log(res.data)
        setUpdate(!update)
      })
    }
    return (
        <div>
            <div className="mb-1">
        <div className="p-2 border-b">
         <div>
         <div className="flex items-center gap-2">
            {/* name */}
            <Link className="font-bold text-blue-500" href={`/user/${comment.username}`}>
              {comment?.username}
            </Link>
            (<span>{moment(comment?.date).fromNow()}</span>)
          </div>
          <p className="py-1">
           {comment?.comment}
          </p>
       <button onClick={()=>handleDeleteComment(comment.id)} className='text-error px-2 py-1 border border-error rounded-full'>Delete</button>
         
         </div>
          {/* Replies */}
         <Reply blog={blog} comment={comment} showReplyBox={showReplyBox} setShowReplyBox={setShowReplyBox} />
         
        </div>
      </div>
        </div>
    );
};

export default Comment;