import { useContext } from 'react';
import { UserContext } from '../../context/ContextProvider';
import Redirect from '../../utl/Redirect/Redirect';

const PrivateRoute = ({children}) => {
    // context provider
    const {user,userLoading} = useContext(UserContext)

if(userLoading){
    return <div className='flex h-screen items-center justify-center w-full'>
    Loading...
</div>
}
    if(user?.email){
        return <>{children}</>
    }else{
      return <Redirect route={'start/login'} />
    }
    
};

export default PrivateRoute;