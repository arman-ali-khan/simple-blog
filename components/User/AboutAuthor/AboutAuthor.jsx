import axios from "axios";
import Link from "next/link";
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
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_PRO}/api/userpostcount?username=${author?.username}`
      )
      .then((res) => {
        if (res.data) {
          setUserPost(res.data);
        }
      });
  }, [author?.username]);

  // on hover
  const [hover, setHover] = useState(false);
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
            className="w-16 h-16 border-2 p-1 border-white object-cover rounded-full"
            src={
              author.photo ||
              "https://www.ucae.es/wp-content/uploads/2021/03/dummy-user.jpg"
            }
            alt=""
          />
        </div>
        <div className="text-center justify-center relative">
          <Link
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            href={`/user/${author?.username}`}
          >
            <h2 className="text-lg text-blue-600 font-bold">
              {author?.fullName}
            </h2>
          </Link>
          {/* hover data */}
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`${
              hover
                ? "absolute bg-gray-200 border z-30 flex justify-center h-auto py-3 w-full"
                : "hidden"
            }`}
          >
            <div>
              <div className="flex justify-center mt-2">
                {/* hover image */}
                <img
                  className="w-16 h-16 border-2 p-1 object-cover rounded-full"
                  src={
                    author.photo ||
                    "https://www.ucae.es/wp-content/uploads/2021/03/dummy-user.jpg"
                  }
                  alt=""
                />
              </div>
              <h2>{author.fullName}</h2>
              <div>{author.about}</div>
              {/* Social hover data */}
              <div className="flex justify-center">
                <ul className="flex items-center gap-4">
                  {author?.fbId ? (
                    <li className="border p-2 rounded-full">
                      <a href={author?.fbId} target="_blank">
                        <RiFacebookFill size={20} />
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {author?.phone ? (
                    <li className="border p-2 rounded-full">
                      <a href={`tel:${author?.phone}`} target="_blank">
                        <RiPhoneLine size={20} />
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {author?.email ? (
                    <li className="border p-2 rounded-full">
                      <a href={`mailto:${author?.email}`} target="_blank">
                        <MdAlternateEmail size={20} />
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
          <p>{author?.about}</p>
        </div>
        {/* Post */}
        <div className="my-3">
          <div className="flex justify-center">
            <ul className="flex items-center gap-4">
              {author?.fbId ? (
                <li className="border p-2 rounded-full">
                  <a href={author?.fbId} target="_blank">
                    <RiFacebookFill size={20} />
                  </a>
                </li>
              ) : (
                ""
              )}
              {author?.phone ? (
                <li className="border p-2 rounded-full">
                  <a href={`tel:${author?.phone}`} target="_blank">
                    <RiPhoneLine size={20} />
                  </a>
                </li>
              ) : (
                ""
              )}
              {author?.email ? (
                <li className="border p-2 rounded-full">
                  <a href={`mailto:${author?.email}`} target="_blank">
                    <MdAlternateEmail size={20} />
                  </a>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          <div className="flex justify-around px-3 my-2">
            <div
              title="Posts"
              className="flex flex-col justify-center text-center"
            >
              <h2 className="text-base font-bold">
                <FiEdit3 size={24} />
              </h2>
              <p>{userPost?.count}</p>
            </div>
            <div
              title="Followers"
              className="flex flex-col justify-center text-center"
            >
              <h2 className="text-base font-bold">
                <PiUsersThree size={24} />
              </h2>
              <p>0</p>
            </div>
            <div
              title="Following"
              className="flex flex-col justify-center text-center"
            >
              <h2 className="text-base font-bold">
                <PiUsers size={24} />
              </h2>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAuthor;
