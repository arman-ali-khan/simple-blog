import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/ContextProvider';

const ProfileRoute = ({children}) => {
    // context provider
    const {user,userLoading} = useContext(UserContext)

    // get user
    const [dbUser,setDbUser] = useState({})

    // loading
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        axios.get(`/api/user?email=${user.email}`).then(res=>{
            setDbUser(res.data)
            if(dbUser.email){
                setLoading(false)
            }
            console.log(res.data);
        })
    },[user.email,userLoading])

if(loading || userLoading){
    return <div className='flex h-screen items-center justify-center w-full'>
        Loading...
    </div>
}
    if(dbUser.username){
        return <>{children}</>
    }else{
      return <Redirect route={'user/update/profile'} />
    }
    
};

export default ProfileRoute;