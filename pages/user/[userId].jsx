import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import User from '../../components/User/User';
import PrivateRoute from '../../hooks/PrivateRouters/PrivateRoute';
import ProfileRoute from '../../hooks/ProfileUpdate/ProfileRoute';
import Layout from '../../layout/Layout';

const userId = () => {
    const router = useRouter();
    const {userId} = router.query
    console.log(userId)
     // get user from db
  const [dbUser,setDbUser] = useState({})
  // fetch data
  useEffect(()=>{
   if(userId){
    axios.get(`/api/user?username=${userId}`)
    .then(res=>{
        setDbUser(res.data)
    })
   }
  },[userId,!userId])
  
    return (
        <Layout title={'Private route'}>
        <PrivateRoute>
          <ProfileRoute>
          <User user={dbUser} />
          </ProfileRoute>
        </PrivateRoute>
        </Layout>
    );
};

export default userId;