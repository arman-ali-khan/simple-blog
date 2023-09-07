import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';

import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from "react";
import useDbUser from '../hooks/useDbUser/useDbUser';

export const auth = getAuth(app)
export const UserContext = createContext()




  
const ContextProvider = ({children}) => {
const [user,setUser] = useState({})
const [dBUser,setDBUser] = useState({})


// userLoading
const [userLoading,setUserLoading] = useState(true)

// create user  
const createUser = (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
}
// login 
const loginUser = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}
// logout
const logOut = ()=>{
    Cookies.remove('token')
    return signOut(auth)
}

// site settings
const [settings,setSettings] = useState({})
// console.log(settings)


async function getServerSideProps() {
   
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/settings`);
    const data = await response.json();
     setSettings(data[0])
    };

useEffect(()=>{
    getServerSideProps()
},[])

// set user
useEffect(()=>{
    setUserLoading(true)
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        setUserLoading(false)
    })
    return ()=>{ 
        unsubscribe()
        setUserLoading(false)
    };
},[])
// email
const email = user?.email
// get dbUser
const [dbUser,dbLoading] = useDbUser({email,logOut})
    const value = {user,createUser,logOut,settings,dbLoading,dbUser,loginUser,userLoading}
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};




export default ContextProvider;

