import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useDbUser = ({ email,logOut }) => {

  // dbUser loading
  const [dbLoading,setDbLoading] = useState(false)
 
  const [dbUser, setDbUser] = useState({});


  const router = useRouter()


  useEffect(() => {
    setDbLoading(true)
 if(email && Cookies.get('token')){
  axios
  .get(`${process.env.NEXT_PUBLIC_API_PRO}/api/users?email=${email}`,{
    headers:{
      authorization: `Basic ${Cookies.get('token')}`,
      email : email
    }
  })
  .then((res) => {
      setDbLoading(false)
      setDbUser(res.data);
    })
    .catch(err=>{
      setDbLoading(false)
      if(err?.response?.status===401){
        logOut().then(() => {
          router.push(`/start/login`)
        })
      }
    })
 }
  }, [email,Cookies.get('token')]);
  return [dbUser,dbLoading];
};

export default useDbUser;
