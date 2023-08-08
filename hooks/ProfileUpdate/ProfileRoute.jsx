import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/ContextProvider';
import Redirect from '../../utl/Redirect/Redirect';

const ProfileRoute = ({children}) => {
    // context provider
    const {user,userLoading} = useContext(UserContext)

    // get user
    const [dbUser,setDbUser] = useState({})

    // loading
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/users?email=${user.email}`).then(res=>{
            setDbUser(res.data)
            if(dbUser){
               return setLoading(false)
            }
            console.log(res.data);
        })
    },[user?.email])

if(userLoading || loading){
    return <div className='flex h-screen items-center justify-center w-full'>
        Loading...
    </div>
}
    if(dbUser?.username){
        return <>{children}</>
    }else{
      return <Redirect route={'user/update/profile'} />
    }
    
};

export default ProfileRoute;