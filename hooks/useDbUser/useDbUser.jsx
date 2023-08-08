import axios from "axios";
import { useEffect, useState } from "react";

const useDbUser = ({ email }) => {
  const [dbUser, setDbUser] = useState({});
  useEffect(() => {
 if(email){
    axios
    .get(`${process.env.NEXT_PUBLIC_API_PRO}/api/users?email=${email}`)
    .then((res) => {
      setDbUser(res.data);
      console.log(res.data)
    });
 }
  }, [email]);
  return [dbUser];
};

export default useDbUser;
