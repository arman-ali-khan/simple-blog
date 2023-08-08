import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/ContextProvider';

const Comment = ({comment,blog,update,setUpdate}) => {
  
    // context
    const {user,logOut} = useContext(UserContext)
  // router
  const router = useRouter()

    // const loading delete
    const [deleteBtn,setdeleteBtn] = useState('Delete')

    // delete comment
    const handleDeleteComment = id =>{
      setdeleteBtn('Deleting...')
      axios.delete(`${process.env.NEXT_PUBLIC_API_PRO}/api/comments/${id}`,{
        headers:{
          authorization: `Basic ${Cookies.get('token')}`,
          email: user.email
        }
      })
      .then(res=>{
        setUpdate(!update)
        setdeleteBtn('Deleted')
      })
      .catch(err=>{
        console.error(err);
        setdeleteBtn('Try again')
        if(err.response.status===401){
          logOut().then(() => {
            router.push(`/start/login`)
          })
        }
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
    {
      user?.email === comment.email &&    <button onClick={()=>handleDeleteComment(comment.id)} className='text-error px-2 py-1 border border-error rounded-full'>{deleteBtn}</button>
      
    }
         
         </div>
         
        </div>
      </div>
        </div>
    );
};

export default Comment;