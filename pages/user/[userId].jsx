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
  const [dbUser,setDbUser] = useState([])
  // fetch data
  useEffect(()=>{
   if(userId){
    axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/allusers?username=${userId}`)
    .then(res=>{
        setDbUser(res.data)
    })
   }
  },[userId,!userId])
  
    return (
        <Layout title={'Private route'}>
        
          <User dbUser={dbUser} />
        </Layout>
    );
};

export default userId;