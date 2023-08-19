import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import { PiUsers, PiUsersThree } from "react-icons/pi";
import { RiFacebookFill, RiPhoneLine } from "react-icons/ri";
import { UserContext } from "../../../context/ContextProvider";

const AboutAuthor = ({ post, author }) => {
  // router
  const router = useRouter();
  //context
  const { user, dbUser, logOut } = useContext(UserContext);
  //  get user posts
  const [userPost, setUserPost] = useState({});
  // get user post
  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_PRO}/api/alluserpost?username=${author?.username}`,
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
  }, [author?.username]);
  const posts = userPost.posts;

  return (
    <div className="border border-t-0 w-full h-72 my-6">
      <div className="py-2 text-lg font-bold bg-blue-500 text-white text-center">
        <h2 className="text-base">About Author</h2>
      </div>
      <div
        className="h-full 
            "
      >
        <div className="w-full flex justify-center my-2">
          <img
            className="w-16 h-16 border-2 p-1 object-cover rounded-full"
            src={
              author.photo ||
              "https://www.ucae.es/wp-content/uploads/2021/03/dummy-user.jpg"
            }
            alt=""
          />
        </div>
        <div className="text-center justify-center">
          <h2 className="text-lg font-bold">{author.fullName}</h2>
          <p>{author.about}</p>
        </div>
        {/* Post */}
        <div className="my-3">
          <div className="flex justify-center">
            <ul className="flex items-center gap-4">
              {author?.fbId ? (
                <li className="border p-2 rounded-full">
                  <a href={author?.fbId}>
                    <RiFacebookFill size={20} />
                  </a>
                </li>
              ) : (
                ""
              )}
              {author?.phone ? (
                <li className="border p-2 rounded-full">
                  <a href={`tel:${author?.phone}`}>
                    <RiPhoneLine size={20} />
                  </a>
                </li>
              ) : (
                ""
              )}
              {author?.email ? (
                <li className="border p-2 rounded-full">
                  <a href={`mailto:${author?.email}`}>
                    <MdAlternateEmail size={20} />
                  </a>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          <div className="flex justify-around px-3 my-2">
            <div title="Posts" className="flex flex-col justify-center text-center">
              <h2 className="text-base font-bold"><FiEdit3 size={24} /></h2>
              <p>{userPost?.count}</p>
            </div>
            <div title="Followers" className="flex flex-col justify-center text-center">
              <h2 className="text-base font-bold"><PiUsersThree size={24} /></h2>
              <p>0</p>
            </div>
            <div title="Following" className="flex flex-col justify-center text-center">
              <h2 className="text-base font-bold"><PiUsers size={24} /></h2>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAuthor;
