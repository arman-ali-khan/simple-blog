import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/ContextProvider';

const Notifications = () => {
    // context
    const {user} = useContext(UserContext)

    // loading
    const [loading,setLoading] = useState(false)
    // all notifications
    const [allNotifications,setAllNotifications] = useState({})
    // fetch
    // useEffect(()=>{
    //     setLoading(true)
    //   if(user?.email){
    //     axios.get(`/api/notifications/comment?email=${user.email}`)
    //     .then(res=>{
    //         setAllNotifications(res.data)
    //         console.log(allNotifications)
    //         setLoading(false)
    //     })
    //   }
    // },[user?.email])
    // notification
    const notifications = allNotifications.posts || []
    return (
       <div className='sm:flex gap-3 container mx-auto'>
        <div className='sm:w-9/12'>
        {/* <div>
            <div>
                    <button className='w-full py-2 bg-base-300 font-bold border border-gray-400'>Read All</button>
                </div>
            <div className='px-4'>
               { loading ? 'Loading...' :
notifications.map(notification=><Notification key={notification._id} notification={notification} />)
               }
            </div>
        </div> */}
        </div>
        <div className='sm:w-3/12'>
            {/*  Categories */}
            {/* <Categories /> */}
        </div>
       </div>
    );
};

export default Notifications;