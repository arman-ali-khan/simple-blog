import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Notification = ({notification}) => {

    // get post 
    const [post,setPost] = useState({})
    useEffect(()=>{
        axios.get(`/api/post/normal?postId=${notification.postId}`)
        .then(res=>{
            setPost(res.data)
        })
    },[])

    //  seen notification
    // const handleSeenNotification = () =>{
    //     axios.put('/api/notifications/comment/update')
    //     .then(res=>{
    //         console.log(res.data)
    //     })
    // }
    return (
        <div className='w-full'>
             {/* <ul className='w-full'>
              
                    <Link className='py-4 hover:bg-base-200 bg-base-100 duration-300 flex gap-3 border-b border-gray-400' href={`/blog/${notification.postId}#comments`}>
                       <div className='w-14 h-12 rounded-full relative'>
                       <img className='w-full border-4 border-gray-500 h-full rounded-full bg-gray-400' src={post.featured_image} alt="" />
                       {
                        notification.seen ? '':<span className='absolute right-0 top-0 bg-blue-400 rounded-full h-2 w-2'></span>
                       }
                       </div>
                        <p className='flex flex-col w-full'>
                        {notification.name} Comment on your post "{notification.comment.split(' ').slice(0,5).join(' ')}"
                        <span className='text-xs'>{moment(notification.date).fromNow()}</span>
                        </p>
                    </Link>
                </ul> */}
        </div>
    );
};

export default Notification;