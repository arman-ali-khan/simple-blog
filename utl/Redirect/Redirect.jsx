import { useRouter } from "next/router";
import { useEffect } from "react";

const Redirect = ({route}) => {
    const router = useRouter()
   useEffect(()=>{
    router.push(`/${route}`)
   },[route])
    
};

export default Redirect;