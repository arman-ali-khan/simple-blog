
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { BiComment, BiUser } from "react-icons/bi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RiSearch2Line } from "react-icons/ri";
import Categories from "../../../components/Home/Categories/Categories";
import { UserContext } from "../../../context/ContextProvider";
import PrivateRoute from "../../../hooks/PrivateRouters/PrivateRoute";
import Loader from "../../Loader/Loader";

const BottomBar = () => {
    // context
    const {user} = useContext(UserContext)
    // loading
    const [loading,setLoading] = useState(true)
    // dbUser
    const [dbUser,setDbUser] = useState({})
    // get dbUser
useEffect(()=>{
    axios.get(`/api/user?email=${user?.email}`)
    .then(res=>{
        setDbUser(res.data)
        setLoading(false)
    })
},[user?.email,loading])
    const [showCategory,setShowCategory] = useState(false)
    return (
      <PrivateRoute>
         <div className="w-full flex justify-center">
         {
            user?.email && <div className="fixed bottom-0 border border-black dark:border-white w-full sm:w-96 md:mx-auto backdrop-blur-sm backdrop-hue-rotate-60 backdrop-saturate-150 z-50 sm:rounded-full">
            <div className="sm:rounded-full">
                <ul className="flex w-full justify-between items-center">
                    <li className="w-full">
                        <button onClick={()=>setShowCategory(!showCategory)} className="w-full py-3  flex justify-center" href={'/'} ><HiOutlineMenuAlt1 size={24} /></button>
                    </li>
                    <li className="w-full">
                        <Link className="w-full py-3  flex justify-center" href={'/search'} ><RiSearch2Line size={24} /></Link>
                    </li>
                    <li className="w-full">
                        <Link className="w-full py-3  flex justify-center" href={'/'} ><AiOutlineHome size={24} /></Link>
                    </li>
                    <li className="w-full">
                        <Link className="w-full py-3  flex justify-center" href={'/'} ><BiComment size={24} /></Link>
                    </li>
                    <li className="w-full">
                    {!dbUser.username? <div className='w-full inline py-3 flex justify-center'>
                        <Loader w={8} h={8} />
                    </div> :
                        <Link className="w-full py-3 flex justify-center" href={`/user/${dbUser?.username}`} ><BiUser size={24} /></Link>
         }
                    </li>
                </ul>
            </div>
            {
                showCategory && <div className={` duration-300  ${showCategory ? 'left-0 fixed top-0 duration-300 z-50':"-left-96 duration-300 fixed top-0"} w-full sm:w-96 bg-base-100`}>
                    <button className="w-screen fixed top-0 left-0 h-screen -z-50" onClick={()=>setShowCategory(false)}></button>
                    <div className="h-screen">
                    <Categories />
                    </div>
                <div className="flex fixed bottom-0 w-full sm:w-96 justify-between">
                    <div className="bg-base-200 w-full flex justify-center py-2 px-4">Categories</div>
                    <div onClick={()=>setShowCategory(!showCategory)} className="bg-error w-full flex justify-center py-2 px-4">Close</div>
                </div>
                </div>
            }
        </div>
         }
       </div>
      </PrivateRoute>
    );
};

export default BottomBar;