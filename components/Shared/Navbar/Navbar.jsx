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
          <div className="navbar py-0  md:fixed w-9/12 mx-auto rounded-full border border-blue-400 px-4 z-50 min-h-0 md:top-0 bg-base-100">
        <div className="navbar-start">
          {/* <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link href={'/'}>Home</Link></li>
              <li><Link href={'/search'}>Search</Link></li>
            </ul>
          </div> */}
          <Link href={'/'} className="flex items-center gap-2 normal-case text-xl">
            <Image width={30} height={30} alt='' src="/favicon.svg" />Arman's Blog</Link>
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