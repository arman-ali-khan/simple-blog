import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/ContextProvider';
import Loader from '../../lib/Loader';
import Redirect from '../../utl/Redirect/Redirect';

const ProfileRoute = ({children}) => {
    // context provider
    const {user,userLoading} = useContext(UserContext)

    // get user
    const [dbUser,setDbUser] = useState({})

    // loading
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/users?email=${user.email}`,{
            headers:{
              authorization: `Basic ${Cookies.get('token')}`,
              email : user?.email
            }
          }).then(res=>{
            setDbUser(res.data)
            if(dbUser){
               return setLoading(false)
            }
        })
    },[user?.email])

if(userLoading || loading){
    return <div className='flex h-screen items-center justify-center w-full'>
       <div className="fixed top-0 left-0 w-screen h-screen z-[999]  backdrop-blur-3xl">
        <Loader />
        </div>
    </div>
}
    if(dbUser?.username){
        return <>{children}</>
    }else{
      return <Redirect route={'user/update/profile'} />
    }
    
};

export default ProfileRoute;