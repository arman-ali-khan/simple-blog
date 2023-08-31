import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../../context/ContextProvider";

const Navbar = () => {
    const router = useRouter()
    // context
    const {logOut,user} = useContext(UserContext)

      // logout
  const handleLogout = () => {
    logOut()
    .then(() => {
      router.push(`/start/login`)
    })
    
  }
    return (
      <div className="flex justify-center ">
          <div className="navbar md:fixed md:w-9/12 mx-auto py-2 sm:py-0 sm:rounded-full border sm:border-orange-400 px-4 z-50 min-h-0 md:top-0 bg-base-100">
        <div className="navbar-start">
         
          <Link href={'/'} className="flex items-center gap-2 normal-case text-xl">
            <Image width={30} height={30} alt='' src="/favicon.svg" /><span className="hidden sm:block">
              Arman's Blog
              </span>
              </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          <li><Link href={'/'}>Home</Link></li>
              <li><Link href={'/search'}>Search</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          {user?.email ? <button onClick={()=>handleLogout()}>Logout</button>: <Link href={`/start/login`}>Login</Link>}
        </div>
      </div>
      </div>
    );
};

export default Navbar;