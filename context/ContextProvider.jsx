import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';

import axios from 'axios';
import { createContext, useEffect, useState } from "react";

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
    return signOut(auth)
}
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

// get dbUser
useEffect(()=>{
    axios.get(`/api/user?email=${user?.email}`)
    .then(res=>{
        setDBUser(res.data)
    })
},[user?.email])
    const value = {user,createUser,logOut,dBUser,loginUser,userLoading}
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default ContextProvider;