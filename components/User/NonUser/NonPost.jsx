import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { RiFacebookFill, RiPhoneLine } from "react-icons/ri";
import { UserContext } from "../../../context/ContextProvider";
import UserPostCard from "../UserPostCard";

const NonPosts = ({ dbUser }) => {
  const user = dbUser[0];

  const { user: fUser, logOut } = useContext(UserContext);
  //  get user posts
  const [userPost, setUserPost] = useState({});
  // router
  const router = useRouter()
  //  post loading
  const [loading, setLoading] = useState(true);

  // post update
  const [updatePost, setUpdatePost] = useState(false);
  // expire token 
  const [expire,setExpire] = useState(false)
  // fetch user posts
  useEffect(() => {
    setLoading(true);
    if (user?.email) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_PRO}/api/userpost?username=${user?.username}&limit=10&page=1`,
        )
        .then((res) => {
          if (res.data) {
            setUserPost(res.data);
            setLoading(false);
          }
        })
        .catch(err=>{
          console.error(err)
        })
    }
  }, [user?.username, updatePost]);

  // posts
  const posts = userPost?.posts;
  return (
    <div>
      <section className="pt-16 bg-blueGray-50">
        <div className="w-full md:w-2/3 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words border w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="flex justify-center">
                    <img
                      alt="..."
                      src={user.photo || 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'}
                      className="shadow-xl rounded-full absolute md:h-44 h-24 align-middle border-none md:-top-24 -top-12 md:w-44 w-24 bg-base-100 justify-center "
                    />
                  </div>
                </div>
                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4  pt-8">
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

              <div className="text-center mt-2">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                  {user?.fullName}({user?.username})
                </h3>
                <div>
                 
                </div>
                <div className="flex justify-center">
                  <p className="flex items-center gap-2">
                    <BiCalendar size={20} /> {moment(user?.date).fromNow()}
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
                {
                loading ? (
                  <>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NonPosts;
