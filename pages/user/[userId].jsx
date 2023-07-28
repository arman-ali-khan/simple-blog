import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import User from '../../components/User/User';
import Layout from '../../layout/Layout';

const userId = () => {
    const router = useRouter();
    const {userId} = router.query
    console.log(userId)
     // get user from db
  const [dbUser,setDbUser] = useState({})
  // fetch data
  useEffect(()=>{
    axios.get(`/api/user?username=${userId}`)
    .then(res=>{
        setDbUser(res.data)
    })
  },[!userId])
  
    return (
        <Layout title={'Private route'}>
        <User user={dbUser} />
        </Layout>
    );
};

export default userId;