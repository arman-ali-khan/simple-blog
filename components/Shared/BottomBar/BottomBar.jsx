import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiComment, BiUser } from "react-icons/bi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiSearch2Line } from "react-icons/ri";
import { UserContext } from "../../../context/ContextProvider";
import UserCategories from "../../Home/Categories/UserCategories";
import Loader from "../../Loader/Loader";
import CreatePost from "../CreatePost/CreatePost";

const BottomBar = () => {

  // router
   const router = useRouter() //router.pathname
  // context
  const { user,dbUser } = useContext(UserContext);
  // loading
  const [loading, setLoading] = useState(true);
 
  const [showCategory, setShowCategory] = useState(false);

  // get total unseen notifications
  const [unseen, setUnseen] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`/api/notifications/comment/seen?email=${user?.email}`)
  //     .then((res) => {
  //       setUnseen(res.data);
  //     });
  // }, [user?.email]);
  return (
    <div className={`w-full ${(router.pathname==='/post/create' || router.pathname==='/guestbook' ) && 'hidden'} flex justify-center`}>
      {dbUser?.type === "admin" && (
            <Link href={"/admin"}>
          <div className="fixed z-50 bg-base-300 left-3 border border-info px-4 py-2 rounded-full bottom-14">
              <LuLayoutDashboard />
          </div>
            </Link>
        )}
      {user?.email && (
        <div className="fixed bottom-0 border border-orange-600 w-full sm:w-96 md:mx-auto backdrop-blur-sm backdrop-hue-rotate-10 backdrop-saturate-150 z-50 sm:rounded-full">
          <div className="sm:rounded-full">
            <ul className="flex w-full justify-between items-center">
              <li className="w-full">
                <button
                  onClick={() => setShowCategory(!showCategory)}
                  className="w-full py-3 hover:bg-orange-400 hover:duration-300 duration-300 rounded-l-full hover:text-white flex justify-center"
                  href={"/"}
                >
                  <HiOutlineMenuAlt1 size={24} />
                </button>
              </li>
              <li className="w-full">
                <Link
                  className="w-full py-3 hover:bg-orange-400 hover:duration-300 duration-300 hover:text-white flex justify-center"
                  href={"/search"}
                >
                  <RiSearch2Line size={24} />
                </Link>
              </li>
              <li className="w-full">
                <Link className="w-full py-3 hover:bg-orange-400 hover:duration-300 duration-300 hover:text-white flex justify-center" href={"/"}>
                  <AiOutlineHome size={24} />
                </Link>
              </li>
              <li className="w-full">
                <Link
                  className="w-full py-3 hover:bg-orange-400 hover:duration-300 duration-300 hover:text-white relative flex justify-center"
                  href={"/guestbook"}
                >
                  <BiComment size={24} />
                  {/* {
                        unseen.length ? <span className=" text-black bg-rose-500 absolute right-3 top-0 rounded-full p-2 h-3 text-xs flex justify-center items-center w-3">{unseen.length}</span> :''} */}
                </Link>
              </li>
              <li className="w-full">
                {!dbUser.username ? (
                  dbUser.username==='' ? <Link
                  className="w-full py-3 hover:bg-orange-400 hover:duration-300 duration-300 hover:text-white rounded-r-full flex justify-center"
                  href={`/user/update/profile`}
                >
                  <BiUser size={24} />
                </Link>: <div className="w-full py-3 hover:bg-orange-400 hover:duration-300 duration-300 rounded-r-full hover:border-white  flex justify-center">
                  <Loader w={5} h={5} />
                </div>
                ) : (
                  <Link
                    className="w-full py-3 hover:bg-orange-400 hover:duration-300 duration-300 rounded-r-full hover:text-white flex justify-center"
                    href={`/user/${dbUser?.username}`}
                  >
                    <BiUser size={24} />
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
      {showCategory && (
        <div
          className={` duration-300  ${
            showCategory
              ? "left-0 fixed top-0 duration-300 z-50"
              : "-left-96 duration-300 fixed top-0"
          } w-full sm:w-96 bg-base-100`}
        >
          <button
            className="w-screen fixed top-0 left-0 h-screen -z-50"
            onClick={() => setShowCategory(false)}
          ></button>
          <div className="h-screen">
            <UserCategories />
          </div>
          <div className="flex fixed bottom-0 w-full sm:w-96 justify-between">
            <div className="bg-base-200 w-full flex justify-center py-2 px-4">
              Categories
            </div>
            <div
              onClick={() => setShowCategory(!showCategory)}
              className="bg-error text-white font-bold cursor-pointer w-full flex justify-center py-2 px-4"
            >
              Close
            </div>
          </div>
        </div>
      )}
        <CreatePost />
    </div>
  );
};

export default BottomBar;
