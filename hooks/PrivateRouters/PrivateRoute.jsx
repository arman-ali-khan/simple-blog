import { UserContext } from '@/context/ContextProvider';
import Redirect from '@/utl/Redirect/Redirect';
import { useContext } from 'react';

const PrivateRoute = ({children}) => {
    // context provider
    const {user,userLoading} = useContext(UserContext)

if(userLoading){
    return <div>
        Loading...
    </div>
}
    if(user?.email){
        return <>{children}</>
    }else{
      return <Redirect route={'auth/login'} />
    }
    
};

export default PrivateRoute;