import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdAlternateEmail } from "react-icons/md";
import { RiFacebookFill, RiPhoneLine } from "react-icons/ri";
import { UserContext } from "../../context/ContextProvider";
import Loader from "../../lib/Loader";
import UserPostCard from "./UserPostCard";

const User = ({ dbUser }) => {
  const user = dbUser[0];
  const { user: fUser, logOut } = useContext(UserContext);
  
 
  //  get user posts
  const [userPost, setUserPost] = useState({});
  // router
  const router = useRouter();
  //  post loading
  const [loading, setLoading] = useState(true);
    // pagination
    const [currentPage, setCurrentPage] = useState(1);

  // post update
  const [updatePost, setUpdatePost] = useState(false);
  // expire token
  const [expire, setExpire] = useState(false);

    // count
    const count = Math.ceil((userPost?.count || 10 )/ 10)
 
  // fetch user posts
  useEffect(() => {
    setLoading(true);
    if (user?.email) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_PRO}/api/alluserpost?username=${user?.username}&limit=10&page=1`,
          {
            headers: {
              Authorization: `Basic ${Cookies.get("token")}`,
              email: user?.email,
            },
          }
        )
        .then((res) => {
          if (res.data) {
            setUserPost(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response.status === 401) {
            logOut().then(() => {
              router.push(`/start/login`);
            });
          }
        });
    }
  }, [user?.username, updatePost,currentPage]);

  // posts
  const posts = userPost?.posts;
  return (
    <div>
      <section className="pt-16 bg-blueGray-50">
        {user?.type === "admin" && (
            <Link href={"/admin"}>
          <div className="fixed z-50 bg-base-300 left-3 border border-info px-4 py-2 rounded-full bottom-14">
              <LuLayoutDashboard />
          </div>
            </Link>
        )}
        <div className="w-full md:w-2/3 sm:px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words border w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="">
              <div className="flex flex-wrap justify-center ">
                <div className=" px-4 flex  justify-center">
                  <div className="flex justify-center w-full items-center">
                   <div className="flex justify-center items-center">
                   <img
                      alt="..."
                      src={user?.photo}
                      className="shadow-xl rounded-full absolute md:h-44 h-24 align-middle border-none md:-top-24  -top-12 md:w-44 w-24 bg-base-100 justify-center "
                    />
                     
                   </div>
                  </div>
                 
                </div>
                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-2 ">
                    <div className="mr-4 p-3 md:py-6 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        0
                      </span>
                      <span className="text-sm text-blueGray-400">Flowing</span>
                    </div>
                    <div className="mr-4 p-3 md:py-6 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        0
                      </span>
                      <span className="text-sm text-blueGray-400">Flowers</span>
                    </div>
                    <div className="lg:mr-4 p-3 md:py-6 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {posts?.length || 0}
                      </span>
                      <span className="text-sm text-blueGray-400">Posts</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* {fUser?.email &&
                (user?.email !== fUser?.email ? <button>Follow</button> : "")} */}
              <div className="text-center mt-2">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                  {user?.fullName}({user?.username})
                </h3>
                <div>
                  {fUser?.email === user?.email && (
                    <Link
                      className="px-4 py-1 rounded bg-base-200 border inline-block my-3"
                      href={"/user/update/profile"}
                    >
                      Update
                    </Link>
                  )}
                </div>
                <div className="flex justify-center">
                  <p className="flex items-center gap-2">
                    <BiCalendar size={30} /> {moment(user?.date).fromNow()}
                  </p>
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {user?.about}
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  {user?.education}
                </div>
              </div>
              {/* Social */}
              <div className="flex justify-center">
                <ul className="flex items-center gap-4">
                  {user?.fbId ? (
                    <li className="border p-2 rounded-full">
                      <a href={user?.fbId}>
                        <RiFacebookFill size={20} />
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {user?.phone ? (
                    <li className="border p-2 rounded-full">
                      <a href={`tel:${user?.phone}`}>
                        <RiPhoneLine size={20} />
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {user?.email ? (
                    <li className="border p-2 rounded-full">
                      <a href={`mailto:${user?.email}`}>
                        <MdAlternateEmail size={20} />
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
              {/* User posts */}
              <div className="md:px-4 py-2">
                <div>
                  <div className="w-full py-2 px-4 bg-base-300">
                    <h2 className="text-xl font-bold">
                      Articles posted by {user?.username} ({posts?.length || 0})
                    </h2>
                  </div>
                </div>
                {loading ? (
                  <>
                   <div className="fixed top-0 left-0 w-screen h-screen z-[999]  backdrop-blur-3xl">
              <Loader />
              </div>
                    {[...Array(5).keys()].map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="bg-base-200 w-full flex flex-row overflow-hidden md:h-32 sm:h-24 shadow-lg animate-pulse"
                        >
                          <div className="block md:w-44 my-1 w-28 bg-black flex-none bg-cover md:h-auto h-24 object-cover animate-pulse"></div>
                          <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full"></div>
                        </div>
                      );
                    })}
                  </>
                ) : posts?.length ? (
                  posts.map((post) => (
                    <UserPostCard
                      updatePost={updatePost}
                      setUpdatePost={setUpdatePost}
                      key={post.id}
                      post={post}
                    />
                  ))
                ) : (
                  ""
                )}
              </div>
               {/* pagination */}
          {
             <div className="flex justify-center my-3 space-x-1 ">
         
            {userPost?.count > 10 &&
            [...Array(count).keys()].map((item, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(item+1)}
                type="button"
                title="Page 1"
                className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border hover:bg-blue-500  hover:text-base-200 duration-300 rounded shadow-md  border-blue-600 ${
                  item+1 === currentPage? "bg-blue-500 text-black":"bg-base-200"
                }`}
              >
                {item+1}
              </button>
            ))}
          </div>
          }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default User;
