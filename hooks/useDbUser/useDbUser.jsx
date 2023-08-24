import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useDbUser = ({ email,logOut }) => {
 
  const [dbUser, setDbUser] = useState({});


  const router = useRouter()


  useEffect(() => {
 if(email && Cookies.get('token')){
    axios
    .get(`${process.env.NEXT_PUBLIC_API_PRO}/api/users?email=${email}`,{
      headers:{
        authorization: `Basic ${Cookies.get('token')}`,
        email : email
      }
    })
    .then((res) => {
      setDbUser(res.data);
    })
    .catch(err=>{
      if(err?.response?.status===401){
        logOut().then(() => {
          router.push(`/start/login`)
        })
      }
    })
 }
  }, [email,Cookies.get('token')]);
  return [dbUser];
};

export default useDbUser;
